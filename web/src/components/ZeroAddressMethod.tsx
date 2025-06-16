import { useState } from 'react'
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import { toHex, fromHex } from '../utils'

const ZeroAddressMethod: React.FC = () => {
  const [zeroAddressData, setZeroAddressData] = useState('')
  const [txHash, setTxHash] = useState<`0x${string}`>()

  const { isConnected } = useAccount()
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const { data: txData, isPending: isTxDataLoading } = useTransaction({
    hash: txHash,
  })

  const sendToZeroAddress = async () => {
    if (!isConnected || !zeroAddressData) return

    try {
      const dataHex = toHex(zeroAddressData)

      const hash = await sendTransactionAsync({
        to: '0x0000000000000000000000000000000000000000', // 零地址
        value: parseEther('0'), // 0 ETH
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
    if (isSuccess && txHash) return '数据已成功上链！'
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
    console.log(txData)
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
      <h2>Zero Address 上链</h2>
      <p className="desc">
        直接向 zero address 转账 0 ETH，数据写在 data 字段（十六进制）。
      </p>
      <input
        className="input"
        type="text"
        placeholder="请输入要上链的数据"
        value={zeroAddressData}
        onChange={(e) => setZeroAddressData(e.target.value)}
        disabled={isSending || isConfirming}
      />
      <div className="hex-display">
        十六进制：{zeroAddressData ? toHex(zeroAddressData) : ''}
      </div>

      {getStatusMessage() && (
        <div className={`status-message ${isSuccess ? 'success' : 'pending'}`}>
          {getStatusMessage()}
        </div>
      )}

      {txHash && isSuccess && (
        <div className="tx-link-container">
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tx-link"
          >
            在 Etherscan 上查看
          </a>
          <span className="view-data" onClick={() => viewData()}>
            查看数据
          </span>
        </div>
      )}

      <button
        className="btn"
        onClick={sendToZeroAddress}
        disabled={!isConnected || !zeroAddressData || isSending || isConfirming}
      >
        {isSending || isConfirming ? '处理中...' : '数据上链'}
      </button>
    </section>
  )
}

export default ZeroAddressMethod