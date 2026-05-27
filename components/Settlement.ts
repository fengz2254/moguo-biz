import { defineComponent, ref } from 'vue';
import { 
  HelpCircle, AlertCircle, Edit2, Plus, CheckCircle2, Info,
  Wallet, ArrowRight, Download, Search, Filter, RefreshCw,
  Building2, CreditCard, Clock, ChevronRight, ShieldCheck, X
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Settlement',
  components: { 
    HelpCircle, AlertCircle, Edit2, Plus, CheckCircle2, Info,
    Wallet, ArrowRight, Download, Search, Filter, RefreshCw,
    Building2, CreditCard, Clock, ChevronRight, ShieldCheck, X
  },
  setup() {
    const activeTab = ref('fund-flow');
    
    // Mock data for Fund Flow
    const fundFlows = ref([
      { id: 'F202603100001', type: '课程收入', amount: '+299.00', status: '已入账', time: '2026-03-10 10:25:18' },
      { id: 'W202603090001', type: '余额提现', amount: '-1000.00', status: '处理中', time: '2026-03-09 15:30:00' },
      { id: 'F202603080002', type: '课程收入', amount: '+199.00', status: '已入账', time: '2026-03-08 14:20:00' },
      { id: 'F202603080001', type: '课程收入', amount: '+99.00', status: '已入账', time: '2026-03-08 09:15:22' },
      { id: 'F202603070003', type: '退款支出', amount: '-99.00', status: '已扣款', time: '2026-03-07 16:40:10' },
    ]);

    // Mock data for Withdraw Records
    const withdrawRecords = ref([
      { id: 'W202603090001', amount: '1000.00', account: '招商银行 (9971)', status: '处理中', time: '2026-03-09 15:30:00' },
      { id: 'W202602150002', amount: '500.00', account: '招商银行 (9971)', status: '提现成功', time: '2026-02-15 10:00:00' },
      { id: 'W202601200001', amount: '2000.00', account: '招商银行 (9971)', status: '提现成功', time: '2026-01-20 09:15:22' },
    ]);

    const getStatusStyle = (status) => {
      switch(status) {
        case '已入账': 
        case '提现成功': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case '处理中': return 'bg-blue-50 text-blue-700 border-blue-200';
        case '已扣款': 
        case '提现失败': return 'bg-slate-50 text-slate-700 border-slate-200';
        default: return 'bg-slate-50 text-slate-600 border-slate-200';
      }
    };

    const showChangeCardModal = ref(false);
    const showEnableAccountModal = ref(false);

    const handleChangeCard = () => {
        showChangeCardModal.value = true;
    };

    const handleEnableAccount = () => {
        showEnableAccountModal.value = true;
    };

    return { 
        activeTab, fundFlows, withdrawRecords, getStatusStyle,
        showChangeCardModal, showEnableAccountModal, handleChangeCard, handleEnableAccount
    };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F3F5F7] min-h-screen font-sans relative overflow-hidden">
    
    <!-- 1. Header Section -->
    <div class="bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-6 shadow-sm z-20 relative">
        <!-- Top Row: Title & Actions -->
        <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Wallet class="w-6 h-6" />
                </div>
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <h1 class="text-xl font-bold text-slate-800 leading-tight">结算管理</h1>
                        <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-bold rounded border border-blue-100">小微户</span>
                        <span class="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded border border-emerald-100 flex items-center gap-1">
                            <ShieldCheck class="w-3 h-3" /> 账户正常
                        </span>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-slate-500">
                        <span>管理账户状态、管理收益、查看明细</span>
                        <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                        <button class="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors group">
                            T+7 结算 <Edit2 class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button class="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <HelpCircle class="w-4 h-4 text-slate-400" />
                    使用帮助
                </button>
                <button class="px-4 py-2 bg-[#0176D3] hover:bg-[#014486] text-white text-sm font-medium rounded shadow-sm transition-colors flex items-center gap-2">
                    提现
                    <ArrowRight class="w-4 h-4" />
                </button>
            </div>
        </div>

        <!-- Bottom Row: Metrics -->
        <div class="grid grid-cols-3 gap-6 pt-2">
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col gap-1">
                <span class="text-[12px] text-slate-500 font-medium uppercase tracking-wide">总余额（元）</span>
                <span class="text-2xl font-bold text-slate-800 tabular-nums">1.40</span>
            </div>
            <div class="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col gap-1">
                <span class="text-[12px] text-slate-500 font-medium uppercase tracking-wide">余额冻结部分（元）</span>
                <span class="text-2xl font-bold text-slate-800 tabular-nums">0.00</span>
            </div>
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col gap-1 relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-100 to-transparent"></div>
                <div class="flex items-center gap-1.5 text-[12px] text-blue-700 font-medium uppercase tracking-wide relative z-10">
                    余额可提现部分（元）
                    <AlertCircle class="w-3.5 h-3.5 text-blue-500 cursor-help" />
                </div>
                <span class="text-2xl font-bold text-blue-900 tabular-nums relative z-10">1.40</span>
            </div>
        </div>
    </div>

    <!-- 2. Tabs & Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Tabs Header -->
        <div class="px-6 bg-white border-b border-slate-200 flex items-center gap-8">
            <button 
                @click="activeTab = 'fund-flow'"
                class="py-3.5 text-sm font-bold border-b-2 transition-colors relative"
                :class="activeTab === 'fund-flow' ? 'border-[#0176D3] text-[#0176D3]' : 'border-transparent text-slate-500 hover:text-slate-800'"
            >
                资金流水明细
            </button>
            <button 
                @click="activeTab = 'withdraw-records'"
                class="py-3.5 text-sm font-bold border-b-2 transition-colors relative"
                :class="activeTab === 'withdraw-records' ? 'border-[#0176D3] text-[#0176D3]' : 'border-transparent text-slate-500 hover:text-slate-800'"
            >
                提现记录
            </button>
            <button 
                @click="activeTab = 'account-info'"
                class="py-3.5 text-sm font-bold border-b-2 transition-colors relative"
                :class="activeTab === 'account-info' ? 'border-[#0176D3] text-[#0176D3]' : 'border-transparent text-slate-500 hover:text-slate-800'"
            >
                开户信息
            </button>
        </div>

        <!-- Tab Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
            
            <!-- Fund Flow Tab -->
            <div v-if="activeTab === 'fund-flow'" class="bg-white border border-slate-200 rounded shadow-sm flex flex-col h-full min-h-[400px]">
                <!-- Toolbar -->
                <div class="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative group w-64">
                            <input 
                                type="text" 
                                placeholder="搜索流水号..." 
                                class="pl-9 pr-3 py-1.5 text-sm border border-slate-300 bg-white rounded focus:outline-none focus:border-[#0176D3] focus:ring-1 focus:ring-[#0176D3]/30 transition-all w-full placeholder:text-slate-400"
                            />
                            <Search class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#0176D3] transition-colors" />
                        </div>
                        <select class="px-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0176D3] bg-white text-slate-700">
                            <option value="">全部类型</option>
                            <option value="income">收入</option>
                            <option value="withdraw">提现</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="p-1.5 text-slate-500 hover:bg-white hover:text-[#0176D3] hover:shadow-sm rounded border border-transparent hover:border-slate-200 transition-all" title="刷新">
                            <RefreshCw class="w-4 h-4" />
                        </button>
                        <button class="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <Download class="w-4 h-4 text-slate-400" />
                            导出
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="flex-1 overflow-auto">
                    <table class="w-full text-left border-collapse min-w-[800px]">
                        <thead class="bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                            <tr>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">流水号</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">类型</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200 text-right">金额（元）</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">状态</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">创建时间</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="item in fundFlows" :key="item.id" class="hover:bg-slate-50 transition-colors group">
                                <td class="py-3 px-4 align-middle">
                                    <span class="text-sm font-medium text-[#0176D3] hover:underline font-mono cursor-pointer">{{ item.id }}</span>
                                </td>
                                <td class="py-3 px-4 align-middle text-sm text-slate-700">{{ item.type }}</td>
                                <td class="py-3 px-4 align-middle text-right">
                                    <span class="text-sm font-bold font-mono" :class="item.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'">
                                        {{ item.amount }}
                                    </span>
                                </td>
                                <td class="py-3 px-4 align-middle">
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border" :class="getStatusStyle(item.status)">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="py-3 px-4 align-middle text-sm text-slate-500 font-mono">{{ item.time }}</td>
                                <td class="py-3 px-4 align-middle text-right">
                                    <button class="text-[#0176D3] hover:text-[#014486] text-sm font-medium hover:underline">详情</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <div class="px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 bg-white">
                    <span>显示 1-5 共 5 条</span>
                    <div class="flex items-center gap-2">
                        <button class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
                        <button class="px-2 py-1 border border-[#0176D3] bg-[#0176D3] text-white rounded font-medium">1</button>
                        <button class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>下一页</button>
                    </div>
                </div>
            </div>

            <!-- Withdraw Records Tab -->
            <div v-else-if="activeTab === 'withdraw-records'" class="bg-white border border-slate-200 rounded shadow-sm flex flex-col h-full min-h-[400px]">
                <!-- Toolbar -->
                <div class="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="relative group w-64">
                            <input 
                                type="text" 
                                placeholder="搜索提现单号..." 
                                class="pl-9 pr-3 py-1.5 text-sm border border-slate-300 bg-white rounded focus:outline-none focus:border-[#0176D3] focus:ring-1 focus:ring-[#0176D3]/30 transition-all w-full placeholder:text-slate-400"
                            />
                            <Search class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#0176D3] transition-colors" />
                        </div>
                        <select class="px-3 py-1.5 border border-slate-300 rounded text-sm focus:outline-none focus:border-[#0176D3] bg-white text-slate-700">
                            <option value="">全部状态</option>
                            <option value="processing">处理中</option>
                            <option value="success">提现成功</option>
                            <option value="failed">提现失败</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="p-1.5 text-slate-500 hover:bg-white hover:text-[#0176D3] hover:shadow-sm rounded border border-transparent hover:border-slate-200 transition-all" title="刷新">
                            <RefreshCw class="w-4 h-4" />
                        </button>
                        <button class="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <Download class="w-4 h-4 text-slate-400" />
                            导出
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="flex-1 overflow-auto">
                    <table class="w-full text-left border-collapse min-w-[800px]">
                        <thead class="bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                            <tr>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">提现单号</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200 text-right">提现金额（元）</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">提现账户</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">状态</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200">申请时间</th>
                                <th class="py-3 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-wide border-b border-slate-200 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr v-for="item in withdrawRecords" :key="item.id" class="hover:bg-slate-50 transition-colors group">
                                <td class="py-3 px-4 align-middle">
                                    <span class="text-sm font-medium text-[#0176D3] hover:underline font-mono cursor-pointer">{{ item.id }}</span>
                                </td>
                                <td class="py-3 px-4 align-middle text-right">
                                    <span class="text-sm font-bold font-mono text-slate-800">
                                        {{ item.amount }}
                                    </span>
                                </td>
                                <td class="py-3 px-4 align-middle">
                                    <div class="flex items-center gap-2">
                                        <div class="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-[8px] font-bold">招</div>
                                        <span class="text-sm text-slate-700">{{ item.account }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 align-middle">
                                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border" :class="getStatusStyle(item.status)">
                                        {{ item.status }}
                                    </span>
                                </td>
                                <td class="py-3 px-4 align-middle text-sm text-slate-500 font-mono">{{ item.time }}</td>
                                <td class="py-3 px-4 align-middle text-right">
                                    <button class="text-[#0176D3] hover:text-[#014486] text-sm font-medium hover:underline">详情</button>
                                </td>
                            </tr>
                            <tr v-if="withdrawRecords.length === 0">
                                <td colspan="6" class="py-12 text-center text-slate-500">
                                    <div class="flex flex-col items-center justify-center">
                                        <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100">
                                            <Clock class="w-6 h-6 text-slate-300" />
                                        </div>
                                        <p class="text-sm">暂无提现记录</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination -->
                <div class="px-4 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 bg-white" v-if="withdrawRecords.length > 0">
                    <span>显示 1-{{ withdrawRecords.length }} 共 {{ withdrawRecords.length }} 条</span>
                    <div class="flex items-center gap-2">
                        <button class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>上一页</button>
                        <button class="px-2 py-1 border border-[#0176D3] bg-[#0176D3] text-white rounded font-medium">1</button>
                        <button class="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>下一页</button>
                    </div>
                </div>
            </div>

            <!-- Account Info Tab -->
            <div v-else-if="activeTab === 'account-info'" class="space-y-6 max-w-4xl">
                <!-- Info Banner -->
                <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start justify-between">
                    <div class="flex gap-3">
                        <Info class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 class="text-sm font-bold text-blue-900 mb-1">多账户管理</h4>
                            <p class="text-sm text-blue-700">当前机构允许最多账户，您最多可开通 10 个账户进行提现。</p>
                        </div>
                    </div>
                    <button class="px-4 py-2 bg-white border border-blue-200 text-blue-700 text-sm font-bold rounded shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shrink-0">
                        <Plus class="w-4 h-4" />
                        开通新账户
                    </button>
                </div>

                <!-- Account Card -->
                <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Building2 class="w-4 h-4" />
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-slate-800">主提现账户</h3>
                                <div class="flex items-center gap-2 mt-0.5">
                                    <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded border border-emerald-100">使用中</span>
                                    <span class="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded border border-emerald-100">账户正常</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-0.5">近12个月已提现</p>
                                <p class="text-sm font-bold text-slate-800">¥ 0.00</p>
                            </div>
                            <div class="h-8 w-px bg-slate-200"></div>
                            <button @click="handleEnableAccount" class="px-4 py-1.5 bg-[#0176D3] hover:bg-[#014486] text-white text-sm font-bold rounded border border-transparent transition-colors">
                                启用账户
                            </button>
                        </div>
                    </div>
                    
                    <div class="p-6 grid grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">机构全称</p>
                            <p class="text-sm text-slate-800 font-medium">王喆</p>
                        </div>
                        <div>
                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">对外简称</p>
                            <p class="text-sm text-slate-800 font-medium">闪频</p>
                        </div>
                        <div class="col-span-2 h-px bg-slate-100"></div>
                        <div>
                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">提现账户开户行</p>
                            <div class="flex items-center gap-3">
                                <div class="flex items-center gap-2">
                                    <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">招</div>
                                    <span class="text-sm text-slate-800 font-medium">招商银行</span>
                                </div>
                                <button @click="handleChangeCard" class="text-[#0176D3] hover:text-[#014486] hover:underline text-xs font-medium flex items-center gap-1">
                                    <Edit2 class="w-3 h-3" /> 更换
                                </button>
                            </div>
                        </div>
                        <div>
                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">提现账户号码</p>
                            <div class="flex items-center gap-2">
                                <CreditCard class="w-4 h-4 text-slate-400" />
                                <span class="text-sm text-slate-800 font-medium font-mono">6214 **** **** 9971</span>
                            </div>
                        </div>
                        <div class="col-span-2 h-px bg-slate-100"></div>
                        <div class="col-span-2">
                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-wide mb-1">开户时间</p>
                            <p class="text-sm text-slate-600 font-mono">2024-04-29 20:50:29</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Modals -->
    <div v-if="showChangeCardModal" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h3 class="text-lg font-bold text-slate-800">更换提现卡信息</h3>
                <button @click="showChangeCardModal = false" class="text-slate-400 hover:text-slate-600">
                    <X class="w-5 h-5" />
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">开户行</label>
                    <select class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0176D3] focus:ring-1 focus:ring-[#0176D3]/30">
                        <option>招商银行</option>
                        <option>工商银行</option>
                        <option>建设银行</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-1">银行卡号</label>
                    <input type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0176D3] focus:ring-1 focus:ring-[#0176D3]/30" placeholder="请输入新的银行卡号" />
                </div>
            </div>
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button @click="showChangeCardModal = false" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">取消</button>
                <button @click="showChangeCardModal = false" class="px-4 py-2 text-sm font-medium text-white bg-[#0176D3] hover:bg-[#014486] rounded-lg transition-colors shadow-sm">确认更换</button>
            </div>
        </div>
    </div>

    <div v-if="showEnableAccountModal" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
            <div class="p-6">
                <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">启用账户成功</h3>
                <p class="text-sm text-slate-500">该账户已成功启用，可正常进行提现操作。</p>
            </div>
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button @click="showEnableAccountModal = false" class="w-full px-4 py-2 text-sm font-medium text-white bg-[#0176D3] hover:bg-[#014486] rounded-lg transition-colors shadow-sm">确定</button>
            </div>
        </div>
    </div>

  </div>
  `
});
