import { ShippingType, DataPropsType, shippingSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

function ShippingForm({ onSubmit } : DataPropsType ) {

  const { register, formState: { errors, isValid }, watch, getValues } = useForm<ShippingType>({ resolver: zodResolver(shippingSchema), mode: 'onChange' });

  const watchedData = watch(); // Watches ALL form fields

  useEffect(() => {
    if (isValid && onSubmit) {
      onSubmit(getValues(), isValid, "shipping");
    }
    else if (onSubmit) {
      onSubmit(null, isValid, "shipping");
    }
  }, [watchedData, isValid, getValues, onSubmit]);

  return (
    <form className='w-full flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className="text-xs text-gray-500 font-medium">Name</label>
        <input
          id='name'
          className='border-b py-2 border-gray-200 outline-none text-sm'
          placeholder='John Doe'
          type='text'
          {...register("name")}
        />
        <p className='text-red-500 text-xs'>{errors.name?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email' className="text-xs text-gray-500 font-medium">Email</label>
        <input
          id='email'
          className='border-b py-2 border-gray-200 outline-none text-sm'
          placeholder='john.doe@example.com'
          type='email'
          {...register("email")}
        />
        <p className='text-red-500 text-xs'>{errors.email?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='address' className="text-xs text-gray-500 font-medium">Address</label>
        <input
          id='address'
          className='border-b py-2 border-gray-200 outline-none text-sm'
          placeholder='123 Main St'
          type="text"
          {...register("address", { required: true })}
        />
        <p className='text-red-500 text-xs'>{errors.address?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='phone' className="text-xs text-gray-500 font-medium">Phone</label>
        <input
          id='phone'
          className='border-b py-2 border-gray-200 outline-none text-sm'
          placeholder='(123) 456-7890'
          type='text'
          {...register("phone", { required: true })}
        />
        <p className='text-red-500 text-xs'>{errors.phone?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='city' className="text-xs text-gray-500 font-medium">City</label>
        <input
          id='city'
          className='border-b py-2 border-gray-200 outline-none text-sm'
          placeholder='New York'
          type='text'
          {...register("city", { required: true })}
        />
        <p className='text-red-500 text-xs'>{errors.city?.message}</p>
      </div>
    </form>
  );
}

export default ShippingForm

