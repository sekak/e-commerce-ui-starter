import React, { useState } from 'react'
import { CreditCard, Lock } from 'lucide-react'

function Payment() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-6">
      {/* Payment method selection */}
      <div className="space-y-4">
        <h4 className="text-md font-medium">Payment Method</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentData.paymentMethod === 'card'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-gray-800"
            />
            <CreditCard width={20} height={20} />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentData.paymentMethod === 'paypal'}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="text-gray-800"
            />
            <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
              P
            </div>
            <span>PayPal</span>
          </label>
        </div>
      </div>

      {/* Card details */}
      {paymentData.paymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cardholder Name</label>
            <input
              type="text"
              value={paymentData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Security notice */}
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
        <Lock width={16} height={16} className="text-green-600" />
        <span className="text-sm text-green-700">
          Your payment information is encrypted and secure
        </span>
      </div>

      {/* Place order button */}
      <button className="w-full bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-lg font-medium transition-colors">
        Place Order
      </button>
    </div>
  )
}

export default Payment
