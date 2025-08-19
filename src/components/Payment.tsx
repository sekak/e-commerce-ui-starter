import { PaymentsSchema, DataPropsType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form'

function Payment({ onSubmit }: DataPropsType) {

  const { register, formState: { isValid, errors }, getValues, watch} = useForm({
    resolver: zodResolver(PaymentsSchema), mode: 'onChange'
  })

  const watchedData = watch(); // Watches ALL form fields

  useEffect(()=>{
    if(isValid)
      onSubmit(getValues(), isValid, "payment")
    else
      onSubmit(null, isValid, "payment");
  },[isValid, watchedData, onSubmit, getValues])

  return (
    <form className='w-full flex flex-col gap-4 mt-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor='name' className="text-xs text-gray-500 font-medium">Name</label>
        <input className='border-b py-2 border-gray-200 outline-none text-sm'
          type="text" placeholder="John Doe" {...register("name")} />
        <p className='text-red-500 text-xs'>{errors.name?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='cardNumber' className="text-xs text-gray-500 font-medium">Card Number</label>
        <input className='border-b py-2 border-gray-200 outline-none text-sm' type="text" placeholder="1234 5678 9012 3456" {...register("cardNumber")} />
        <p className='text-red-500 text-xs'>{errors.cardNumber?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='expiryDate' className="text-xs text-gray-500 font-medium">Expiration Date</label>
        <input className='border-b py-2 border-gray-200 outline-none text-sm' type="text" placeholder="MM/YY" {...register("expiryDate")} />
        <p className='text-red-500 text-xs'>{errors.expiryDate?.message}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='cvv' className="text-xs text-gray-500 font-medium">CVV</label>
        <input className='border-b py-2 border-gray-200 outline-none text-sm' type="text" placeholder="123" {...register("cvv")} />
        <p className='text-red-500 text-xs'>{errors.cvv?.message}</p>
      </div>
      <div className='flex items-center gap-2'>
        <Image src="/klarna.png" alt="Klarna Logo" width={50} height={25} className='object-contain rounded-md' />
        <Image src="/cards.png" alt="Cards Logo" width={50} height={25} className='object-contain rounded-md' />
        <Image src="/stripe.png" alt="Stripe Logo" width={50} height={25} className='object-contain rounded-md' />
      </div>
    </form>
  )
}

export default Payment
