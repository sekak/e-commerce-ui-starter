'use client';
import Products from '@/components/Products';
import ShippingForm from '@/components/ShippingForm';
import { CartItemsList, ShippingFormData } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {useCallback, useMemo, useState } from 'react'

const CHECKOUT_STEPS = [
  {
    id: 1,
    step: "Shopping Cart",
  },
  {
    id: 2,
    step: "Shipping Information",
  },
  {
    id: 3,
    step: "Payment Method",
  },
] as const;

// TEMPORARY PRODUCTS ITEMS - In production, this should come from a cart context/state
const cartItems: CartItemsList = [
  {
    id: 1,
    name: "Product 1",
    title: "Amazing Product 1",
    description: "This is the description for product 1",
    shortDescription: "Short description for product 1",
    price: 29.99,
    sizes: ["S", "M", "L"],
    colors: ["gray", "purple", "green"],
    images: {
      purple: "/products/1p.png",
      gray: "/products/1g.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "M",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Product 2",
    title: "Amazing Product 2",
    description: "This is the description for product 2",
    shortDescription: "Short description for product 2",
    price: 39.99,
    sizes: ["M", "L", "XL"],
    colors: ["white", "gray"],
    images: {
      white: "/products/6w.png",
      gray: "/products/6g.png",
    },
    quantity: 1,
    selectedSize: "L",
    selectedColor: "white",
  },
  {
    id: 3,
    name: "Product 3",
    title: "Amazing Product 3",
    description: "This is the description for product 3",
    shortDescription: "Short description for product 3",
    price: 49.99,
    sizes: ["S", "M"],
    colors: ["red", "orange", "blue"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      blue: "/products/5bl.png",
    },
    quantity: 1,
    selectedSize: "S",
    selectedColor: "red",
  },
];

function Cart() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isShippingFormValid, setIsShippingFormValid] = useState(false)
  const activeStep = parseInt(searchParams.get('step') || '1');

  const handleContinue = useCallback(() => {
    if (activeStep < CHECKOUT_STEPS.length) {
      console.log("=>>>",isShippingFormValid)
      if(activeStep === 2 && !isShippingFormValid) {
        return;
      }
      router.push(`/cart?step=${activeStep + 1}`, { scroll: false });
    }
  }, [activeStep, router, isShippingFormValid]);

  const { subtotal, discountAmount, shippingCost, total } = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountPercentage = 0.1; // 10%
    const discountAmount = subtotal * discountPercentage;
    const shippingCost = 10;
    const total = subtotal - discountAmount + shippingCost;

    return {
      subtotal,
      discountAmount,
      shippingCost,
      total,
    };
  }, []);

  const renderButtons = useCallback(() => {
    switch (activeStep) {
      case 1:
        return (
          <button
            onClick={handleContinue}
            className='mt-2 flex items-center gap-3 cursor-pointer text-white text-center w-full bg-gray-800 hover:bg-gray-900  justify-center p-3 rounded-lg transition-colors'>
            Continue to Shipping
            <ArrowRight width={16} height={16} />
          </button>
        )
      case 2:
        return (
          <button
            disabled={!isShippingFormValid}
            onClick={handleContinue}
            className={`mt-2 flex items-center gap-3  text-white text-center w-full justify-center p-3 rounded-lg transition-colors ${isShippingFormValid ? 'cursor-pointer bg-gray-800 hover:bg-gray-900' : 'disabled:bg-gray-400 disabled:cursor-not-allowed'}`}>
            Continue to Payment
            <ArrowRight width={16} height={16} />
          </button>
        )
      case 3:
        return null;

    }
  }, [activeStep, isShippingFormValid, handleContinue])

  const onSubmit = useCallback((data: ShippingFormData, isValid: boolean) => {
    setIsShippingFormValid(isValid);
    console.log(data);
  }, []);

  const renderStepContent = useCallback(() => {
    switch (activeStep) {
      case 1: 
       return (
        <Products activeStep={activeStep} cartItems={cartItems}/>
       )
      case 2:
        return (
          <ShippingForm onSubmit={onSubmit} />
        )
    }
  },[activeStep, onSubmit])

  return (
    <div className='mt-8 flex flex-col items-center justify-center gap-8'>
      <h2 className='text-2xl font-bold text-white'>Shopping Cart</h2>
      {/* Steps */}
      <div className='flex md:w-full md:flex-row flex-col md:justify-evenly'>
        {CHECKOUT_STEPS.map(step => (
          <div key={step.id} className={`flex items-center gap-2 md:border-b-2 py-2 ${activeStep === step.id ? 'border-gray-600' : 'border-gray-200'}`}>
            <span className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${activeStep === step.id ? 'bg-gray-600' : 'bg-gray-400'}`}>{step.id}</span>
            <h3 className={`font-semibold ${activeStep === step.id ? 'text-gray-600' : 'text-gray-400'}`}>{step.step}</h3>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className='w-full p-6 flex lg:flex-row flex-col gap-8'>
        <div className='flex-[3] w-full rounded-lg shadow-lg p-6 gap-4'>
          <h2 className='mb-2 text-lg font-medium'>{activeStep === 1 ? 'Cart Information' : activeStep === 2 ? 'Shipping Information' : 'Payment Information'}</h2>
          {renderStepContent()}
        </div>
          
          <div className='flex-[2] w-full rounded-lg shadow-lg p-6 gap-4'>
            <h2 className='mb-2 text-lg font-medium'>Cart Details</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between text-gray-500 items-center text-sm'>
                <span className=''>Subtotal</span>
                <span className='font-medium '>{subtotal}</span>
              </div>
              <div className='flex justify-between items-center text-gray-500 text-sm'>
                <span className=''>Discount (10%)</span>
                <span className='font-medium text-green-400'>-${discountAmount}</span>
              </div>
              <div className='flex justify-between items-center text-gray-500 text-sm'>
                <span className=''>Shipping</span>
                <span className='font-medium'>${shippingCost}</span>
              </div>
              <div className="w-full border-b border-gray-300 my-2" />
              <div className='flex justify-between items-center text-lg font-semibold'>
                <span>Total</span>
                <span>${total}</span>
              </div>
              {renderButtons()}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
