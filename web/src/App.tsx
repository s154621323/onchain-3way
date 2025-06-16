import { useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import './index.css'
import ZeroAddressMethod from './components/ZeroAddressMethod'
import ContractLogMethod from './components/ContractLogMethod'
import ReceiveMethod from './components/ReceiveMethod'

function App() {
  const [activeTab, setActiveTab] = useState<number>(0)

  const tabs = [
    { id: 0, name: 'Zero Address 上链', component: <ZeroAddressMethod /> },
    { id: 1, name: '合约日志上链', component: <ContractLogMethod /> },
    { id: 2, name: 'receive 回调上链', component: <ReceiveMethod /> },
  ]

  return (
    <div className="app-container">
      {/* 钱包连接按钮 */}
      <ConnectKitButton />

      <h1 className="app-title">数据上链 DApp UI</h1>
      <p className="app-subtitle">三种数据上链方式</p>

      {/* Tabs 导航 */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="tab-content">{tabs[activeTab].component}</div>
    </div>
  )
}

export default App