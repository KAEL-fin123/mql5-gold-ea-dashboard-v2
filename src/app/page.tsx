'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Target, BarChart3, Calendar, DollarSign, RefreshCw, Plus, Settings } from 'lucide-react';
import Header from '../components/Header';
import EACard, { EAData } from '../components/EACard';
import EADetailModal from '../components/EADetailModal';
import SuggestionForm from '../components/SuggestionForm';
import SidebarAd from '../components/SidebarAd';
import BottomThemeToggle from '../components/BottomThemeToggle';

import { useEAs } from '../hooks/useEAs';
import { queryClient } from '../lib/query-client';

// 排行榜类型定义
type RankingType = 'win_rate' | 'drawdown' | 'max_risk_reward' | 'avg_risk_reward' | 'annual_return' | 'monthly_return';

// 排行榜配置
const rankingTabs = [
  {
    id: 'win_rate' as RankingType,
    name: '胜率榜',
    icon: TrendingUp,
    description: '按胜率降序排列',
    color: 'text-accent'
  },
  {
    id: 'drawdown' as RankingType,
    name: '回撤榜',
    icon: TrendingDown,
    description: '按最大回撤升序排列',
    color: 'text-destructive'
  },
  {
    id: 'max_risk_reward' as RankingType,
    name: '最大盈亏比榜',
    icon: Target,
    description: '按最大盈亏比降序排列',
    color: 'text-primary'
  },
  {
    id: 'avg_risk_reward' as RankingType,
    name: '平均盈亏比榜',
    icon: BarChart3,
    description: '按平均盈亏比降序排列',
    color: 'text-primary'
  },
  {
    id: 'annual_return' as RankingType,
    name: '年化榜',
    icon: Calendar,
    description: '按年化收益降序排列',
    color: 'text-accent'
  },
  {
    id: 'monthly_return' as RankingType,
    name: '本月收益榜',
    icon: DollarSign,
    description: '按月度收益降序排列',
    color: 'text-accent'
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<RankingType>('win_rate');
  const [year] = useState(2025);
  const [month] = useState<number | null>(null);
  const [selectedEA, setSelectedEA] = useState<EAData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSuggestionFormOpen, setIsSuggestionFormOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // 使用TanStack Query获取EA数据
  const {
    data: eaResponse,
    isLoading: loading,
    error,
    refetch
  } = useEAs({
    sortBy: activeTab,
    year,
    month,
    limit: 10
  });

  // 获取EA数据
  const eaData = eaResponse?.data || [];

  // 根据搜索查询过滤EA数据
  const filteredEAData = searchQuery.trim()
    ? eaData.filter(ea =>
        ea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ea.description && ea.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : eaData;

  // 处理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 处理标签切换
  const handleTabChange = (tabId: RankingType) => {
    setActiveTab(tabId);
  };

  // 刷新数据
  const handleRefresh = () => {
    refetch();
  };

  // 处理EA卡片点击
  const handleEAClick = (ea: EAData) => {
    setSelectedEA(ea);
    setIsDetailModalOpen(true);
  };

  // 关闭详情弹窗
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEA(null);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* 侧边栏广告位 */}
      <SidebarAd position="left" />
      <SidebarAd position="right" />
      
      {/* 新的Header组件 */}
      <Header onSearch={handleSearch} />

      {/* 主标题和副标题区域 */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
              MQL5 GOLD EA 榜单
            </h1>
            <p className="text-muted-foreground text-lg">
              专业黄金EA交易系统排行榜 - 实时数据，精准分析
            </p>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                搜索结果："{searchQuery}" ({filteredEAData.length} 个结果)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 排行榜标签导航 */}
      <div className="border-b border-border bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {rankingTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="container mx-auto px-4 py-8">
        {/* 操作栏 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {rankingTabs.find(tab => tab.id === activeTab)?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {rankingTabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </button>
            
            <button
              onClick={() => setIsSuggestionFormOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              建议EA
            </button>
          </div>
        </div>

        {/* EA列表 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-muted rounded"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-destructive mb-4">
              <Settings className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-medium">数据加载失败</p>
            </div>
            <p className="text-muted-foreground mb-4">
              {error instanceof Error ? error.message : '未知错误'}
            </p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              重试
            </button>
          </div>
        ) : filteredEAData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-medium">
                {searchQuery ? '未找到匹配的EA' : '暂无数据'}
              </p>
            </div>
            <p className="text-muted-foreground">
              {searchQuery ? '请尝试其他搜索关键词' : '请稍后再试或联系管理员'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEAData.map((ea, index) => (
              <EACard
                key={ea.id}
                ea={ea}
                rank={index + 1}
                onClick={() => handleEAClick(ea)}
                sortBy={activeTab}
              />
            ))}
          </div>
        )}
      </div>

      {/* EA详情弹窗 */}
      {selectedEA && (
        <EADetailModal
          ea={selectedEA}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
        />
      )}

      {/* 建议表单弹窗 */}
      <SuggestionForm
        isOpen={isSuggestionFormOpen}
        onClose={() => setIsSuggestionFormOpen(false)}
      />

      {/* 底部主题切换 */}
      <BottomThemeToggle />
    </div>
  );
}