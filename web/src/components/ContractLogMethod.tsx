import { useState } from 'react'
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import { contractAddress } from '../contract'
import { toHex, fromHex } from '../utils'

const ContractLogMethod: React.FC = () => {
  const [contractData, setContractData] = useState('')
  const [txHash, setTxHash] = useState<`0x${string}`>()
  const { isConnected } = useAccount()
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction()

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const { data: txData, isPending: isTxDataLoading } = useTransaction({
    hash: txHash,
  })

  // 给合约转账
  const handleSendEth = async () => {
    if (!isConnected || !contractData) return
    try {
      const dataHex = toHex(contractData)

      const hash = await sendTransactionAsync({
        to: contractAddress,
        value: parseEther('0'),
        data: dataHex as `0x${string}`, // 数据字段
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

  // 查看数据
  const viewData = () => {
    if (isTxDataLoading) {
      alert('正在加载交易数据，请稍后...')
      return
    }

    if (!txData) {
      alert('未能获取交易数据，请确认交易已确认')
      return
    }
    // 从交易input字段获取链上数据
    const hexData = txData.input

    try {
      const decodedData = fromHex(hexData)
      alert(decodedData)
    } catch (error) {
      alert(`无法解析链上数据: ${hexData}`)
    }
  }

  return (
    <section className="card">
      <h2>合约日志上链</h2>
      <p className="desc">数据通过日志（event）形式存储在链上。</p>
      <input
        className="input"
        type="text"
        placeholder="请输入要上链的数据"
        value={contractData}
        onChange={(e) => setContractData(e.target.value)}
        disabled={isSending || isConfirming}
      />
      <div className="hex-display">
        十六进制：{contractData ? toHex(contractData) : ''}
      </div>

      {getStatusMessage() && (
        <div className={`status-message ${isSuccess ? 'success' : 'pending'}`}>
          {getStatusMessage()}
        </div>
      )}

      {txHash && isSuccess && (
        <div className="tx-link-container">
          <span className="view-data" onClick={viewData}>
            查看数据
          </span>
        </div>
      )}

      <button
        className="btn"
        onClick={handleSendEth}
        disabled={!isConnected || !contractData || isSending || isConfirming}
      >
        {isSending || isConfirming ? '处理中...' : '数据上链'}
      </button>
    </section>
  )
}