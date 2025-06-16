import React, { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { contractAddress } from '../contract'

const ReceiveMethod: React.FC = () => {
  const [receiveData, setReceiveData] = useState('')
  const [txHash, setTxHash] = useState<`0x${string}`>()
  
  const { isConnected } = useAccount()
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })
  
  const handleReceive = async () => {
    if (!isConnected) return
    
    try {
      const hash = await sendTransactionAsync({
        to: contractAddress,
        value: parseEther('0.0001'), // 发送少量ETH触发receive函数
      })
      
      setTxHash(hash)
    } catch (error) {
      console.error('交易发送失败:', error)
    }
  }
  
  // 获取交易状态信息
  const getStatusMessage = () => {
    if (isSending) return '交易发送中...'
    if (isConfirming) return '交易确认中...'
    if (isSuccess) return '数据已成功上链！'
    if (txHash) return '交易已提交'
    return ''
  }

  return (
    <section className="card">
      <h2>存储消息上链</h2>
      <p className="desc">向合约发送ETH触发receive回调函数。</p>
      
      {getStatusMessage() && (
        <div className={`status-message ${isSuccess ? 'success' : 'pending'}`}>
          {getStatusMessage()}
        </div>
      )}
      
      <button
        className="btn"
        onClick={handleReceive}
        disabled={!isConnected || isSending || isConfirming}
      >
        {isSending || isConfirming ? '处理中...' : '上链（receive 回调）'}
      </button>
    </section>
  )
}

export default ReceiveMethod