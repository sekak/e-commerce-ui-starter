'use client';
import Payment from '@/components/Payment';
import Products from '@/components/Products';
import ShippingForm from '@/components/ShippingForm';
import { PaymentType, ShippingType } from '@/types';
import useCartStore from '@/zustand/cartStore';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'

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

function Cart() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isShippingFormValid, setIsShippingFormValid] = useState(false)
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false)
  const activeStep = parseInt(searchParams.get('step') || '1');
  const { Cart } = useCartStore((state) => state);

  const handleContinue = useCallback(() => {
    if (activeStep < CHECKOUT_STEPS.length) {
      if (activeStep === 2 && !isShippingFormValid) {
        return;
      }
      router.push(`/cart?step=${activeStep + 1}`, { scroll: false });
    }
  }, [activeStep, router, isShippingFormValid]);

  const { subtotal, discountAmount, shippingCost, total } = useMemo(() => {
    const subtotal = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountPercentage = 0.1;
    const discountAmount = subtotal * discountPercentage;
    const shippingCost = 10;
    const total = subtotal - discountAmount + shippingCost;

    return {
      subtotal: subtotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      total: total.toFixed(2),
    };
  }, [Cart]);

  const renderButtons = useCallback(() => {
    switch (activeStep) {
      case 1:
        return (
          <button
            disabled={Cart.length === 0}
            onClick={handleContinue}
            className={`mt-2 flex items-center gap-3  text-white text-center w-full justify-center p-3 rounded-lg transition-colors ${Cart.length > 0 ? 'cursor-pointer bg-gray-800 hover:bg-gray-900' : 'disabled:bg-gray-400 disabled:cursor-not-allowed'}`}>
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
        return (
          <button
            disabled={!isPaymentFormValid}
            onClick={handleContinue}
            className={`mt-2 flex items-center gap-3  text-white text-center w-full justify-center p-3 rounded-lg transition-colors ${isPaymentFormValid ? 'cursor-pointer bg-gray-800 hover:bg-gray-900' : 'disabled:bg-gray-400 disabled:cursor-not-allowed'}`}>
            Checkout
            <ShoppingCart width={16} height={16} />
          </button>
        )

    }
  }, [activeStep, isShippingFormValid, handleContinue, isPaymentFormValid, Cart])

  // This function used to get data from shipping, payment
  const onSubmit = useCallback((data: ShippingType | PaymentType | null, isValid: boolean, step?: 'payment' | 'shipping') => {
    if (data && step === 'shipping') {
      setIsShippingFormValid(isValid);
      console.log("data shipping => ", data);
    }
    else if (data && step === 'payment') {
      setIsPaymentFormValid(isValid);
      console.log("data payment => ", data);
    }
    else {
      setIsPaymentFormValid(false);
      setIsShippingFormValid(false);
    }
  }, []);

  const renderStepContent = useCallback(() => {
    switch (activeStep) {
      case 1:
        return <Products />
      case 2:
        return <ShippingForm onSubmit={onSubmit} />
      case 3:
        return <Payment onSubmit={onSubmit} />
    }
  }, [activeStep, onSubmit])

  return (
    <div className='mt-8 flex flex-col items-center justify-center gap-8'>
      <h2 className='text-2xl font-bold text-white'>Shopping Cart</h2>
      {/* Steps */}
      <div className='flex md:w-full md:flex-row flex-col md:justify-evenly'>
        {CHECKOUT_STEPS.map(step => (
          <div key={step.id} className={`flex items-center gap-2 md:border-b-2 py-2 ${activeStep === step.id ? 'border-gray-600' : 'border-gray-200'}`}>
            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activeStep === step.id ? 'bg-gray-600' : 'bg-gray-400'}`}>{step.id}</span>
            <h3 className={`font-semibold sm:text-sm md:text-md lg:text-lg ${activeStep === step.id ? 'text-gray-600' : 'text-gray-400'}`}>{step.step}</h3>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className='w-full p-6 flex lg:flex-row flex-col gap-8'>
        <div className='flex-[3] w-full rounded-lg shadow-lg p-6 gap-4'>
          {renderStepContent()}
        </div>

        <div className='flex-[2] h-max w-full rounded-lg shadow-lg p-6 gap-4'>
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
