import { defineComponent, ref } from 'vue';
import { 
  Search, HelpCircle, RefreshCw, ChevronLeft, ChevronRight, 
  FileText, ChevronDown, Filter, Settings, Download, 
  MoreHorizontal, CreditCard, User, Clock, CheckCircle2, 
  AlertCircle, X, Printer, Mail, ArrowUpRight, Copy, Wallet,
  Video, Table as TableIcon, Calendar, TrendingUp, RotateCcw
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Finance',
  components: { 
    Search, HelpCircle, RefreshCw, ChevronLeft, ChevronRight, 
    FileText, ChevronDown, Filter, Settings, Download,
    MoreHorizontal, CreditCard, User, Clock, CheckCircle2,
    AlertCircle, X, Printer, Mail, ArrowUpRight, Copy, Wallet,
    Video, TableIcon, Calendar, TrendingUp, RotateCcw
  },
  setup() {
    // Exact data from the screenshot provided in previous context
    const transactionList = ref([
      { 
        id: 'G603058184298430470',
        productName: '讨论互联网产品设计',
        productId: '618804370858053',
        validity: '随到随学（100）天',
        status: '支付成功',
        amount: '¥0.01',
        method: '支付宝',
        payTime: '2026-01-21 15:25:18',
        orderTime: '2026-01-21 15:24:48',
        buyerName: '王鑫老师',
        buyerPhone: '188****2260'
      },
      { 
        id: 'G602764699301314566',
        productName: '111',
        productId: '764595850403909',
        validity: '随到随学（30）天',
        status: '支付成功',
        amount: '¥0.10',
        method: '微信',
        payTime: '2026-01-19 14:49:41',
        orderTime: '2026-01-19 14:49:17',
        buyerName: '慧星0045',
        buyerPhone: '173****0045'
      },
      { 
        id: 'G557232664940118020',
        productName: '讨论互联网产品设计',
        productId: '618804370858053',
        validity: '随到随学（100）天',
        status: '支付成功',
        amount: '¥0.01',
        method: '支付宝',
        payTime: '2025-03-11 12:09:22',
        orderTime: '2025-03-11 12:09:10',
        buyerName: '老赵',
        buyerPhone: '152****2254'
      },
      { 
        id: 'G557230607785000964',
        productName: '测试课程',
        productId: '653426581569605',
        validity: '随到随学（30）天',
        status: '支付成功',
        amount: '¥0.10',
        method: '支付宝',
        payTime: '2025-03-11 11:48:59',
        orderTime: '2025-03-11 11:48:44',
        buyerName: '老赵',
        buyerPhone: '152****2254'
      }
    ]);

    // Mock data for the detailed learning records (from screenshot)
    const learningRecords = ref([
        { id: 1, unit: '新建单元', lesson: '2024-12-03', type: '直播', duration: '01 时 00 分 00 秒', status: '未学习' },
        { id: 2, unit: '新建单元', lesson: '科技', type: '直播', duration: '01 时 00 分 00 秒', status: '未学习' },
        { id: 3, unit: '新建单元', lesson: '水电费', type: '直播', duration: '01 时 00 分 00 秒', status: '未学习' },
        { id: 4, unit: '新建单元', lesson: '水电费', type: '直播', duration: '01 时 00 分 00 秒', status: '未学习' },
        { id: 5, unit: '新建单元', lesson: 'obs2025-03-11', type: '直播', duration: '01 时 00 分 00 秒', status: '未学习' },
        { id: 6, unit: '新建单元', lesson: '课时回顾', type: '视频', duration: '00 时 45 分 00 秒', status: '已学习' },
    ]);

    // UI State for Drawer
    const selectedTransaction = ref(null);
    const isDrawerOpen = ref(false);

    const openDrawer = (item) => {
        selectedTransaction.value = item;
        isDrawerOpen.value = true;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
        setTimeout(() => {
            selectedTransaction.value = null;
        }, 300);
    };

    // Helper for Status Badge Styling - Forced Light Theme
    const getStatusStyle = (status) => {
        if (status === '支付成功') return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
        if (status === '待支付') return 'bg-amber-50 text-amber-700 border border-amber-100';
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    };

    return { 
        transactionList, 
        selectedTransaction, 
        isDrawerOpen, 
        openDrawer, 
        closeDrawer, 
        getStatusStyle,
        learningRecords
    };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F3F5F7] min-h-screen font-sans p-4 space-y-3 relative">
    
    <!-- 1. Top Section: Metrics (Visual Anchors Added) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- Card 1: Order Metrics (Blue Anchor) -->
        <div class="bg-white border border-slate-200 border-l-4 border-l-[#1677FF] rounded-r rounded-l-[1px] p-4 shadow-sm flex items-center justify-around hover:shadow-md transition-shadow group">
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日订单</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums">0</h3>
            </div>
            <div class="w-px h-8 bg-slate-100"></div>
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日订单金额</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums font-mono">0.00</h3>
            </div>
        </div>

        <!-- Card 2: Deal Metrics (Green Anchor) -->
        <div class="bg-white border border-slate-200 border-l-4 border-l-[#07C160] rounded-r rounded-l-[1px] p-4 shadow-sm flex items-center justify-around hover:shadow-md transition-shadow group">
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日成交订单</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums">0</h3>
            </div>
             <div class="w-px h-8 bg-slate-100"></div>
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日成交金额</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums font-mono">0.00</h3>
            </div>
        </div>
    </div>

    <!-- 2. Main Content Container -->
    <div class="flex flex-col flex-1 gap-0">
        
        <!-- Table Card -->
        <div class="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden relative">
            
            <!-- Toolbar (Refined Layout) -->
            <div class="px-4 py-3 border-b border-slate-200 flex flex-col xl:flex-row items-center justify-between gap-3 bg-white">
                 <!-- Filters Left -->
                 <div class="flex flex-wrap items-center gap-2 w-full xl:w-auto">
                    <!-- ID Input -->
                    <div class="relative">
                        <input type="text" placeholder="单号" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-32 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>

                    <!-- Status Select -->
                    <div class="relative">
                        <select class="appearance-none bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-slate-600 text-xs rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-primary-500 cursor-pointer min-w-[90px] transition-all">
                            <option value="" disabled selected>交易状态</option>
                            <option value="success">支付成功</option>
                            <option value="pending">待支付</option>
                        </select>
                        <ChevronDown class="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <!-- Product Input -->
                    <div class="relative">
                         <input type="text" placeholder="商品名称" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-32 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>

                    <!-- Buyer Input -->
                    <div class="relative">
                         <input type="text" placeholder="买家昵称/手机" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-32 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>
                    
                    <div class="w-[1px] h-5 bg-slate-200 mx-1"></div>

                    <button class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded shadow-sm transition-colors flex items-center gap-1">
                        <Search class="w-3 h-3" /> 搜索
                    </button>
                    <button class="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 text-xs font-medium rounded transition-colors flex items-center gap-1">
                        <RotateCcw class="w-3 h-3" /> 重置
                    </button>
                 </div>

                 <!-- Actions Right (Integrated Help) -->
                 <div class="flex items-center gap-2 ml-auto xl:ml-0 w-full xl:w-auto justify-end">
                      <button class="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 text-xs font-medium rounded transition-colors flex items-center gap-1.5 shadow-sm">
                        <Download class="w-3.5 h-3.5" />
                        导出
                    </button>
                    <div class="w-[1px] h-4 bg-slate-200 mx-1"></div>
                    <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors" title="使用帮助">
                        <HelpCircle class="w-4 h-4" />
                    </button>
                 </div>
            </div>

            <!-- Table Area -->
            <div class="flex-1 overflow-auto custom-scrollbar relative">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead class="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                        <tr>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pl-6">交易单号</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">商品信息</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">金额</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pl-6">买家信息</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">状态</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">支付时间</th>
                            <th class="py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr 
                            v-for="item in transactionList" 
                            :key="item.id" 
                            class="hover:bg-primary-50/40 transition-colors group cursor-pointer"
                            @click="openDrawer(item)"
                        >
                            <td class="py-3 px-3 align-top pl-6">
                                <span class="text-xs font-medium text-primary-600 hover:underline font-mono block mb-1 transition-colors">{{ item.id }}</span>
                                <span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-transparent group-hover:bg-white group-hover:border-slate-200 transition-colors">订单</span>
                            </td>
                            <td class="py-3 px-3 align-top">
                                <div class="text-[13px] text-slate-900 font-medium truncate max-w-[240px] mb-1 leading-snug" :title="item.productName">{{ item.productName }}</div>
                                <div class="text-[11px] text-slate-400 font-mono">PID: {{ item.productId }}</div>
                            </td>
                            <td class="py-3 px-3 align-top text-right">
                                <span class="text-[13px] font-bold text-slate-900 font-mono">{{ item.amount }}</span>
                            </td>
                            <td class="py-3 px-3 align-top pl-6">
                                <div class="flex items-start gap-2">
                                    <div class="w-6 h-6 rounded bg-primary-50 flex items-center justify-center text-[10px] font-bold text-primary-600 uppercase mt-0.5 group-hover:bg-white group-hover:shadow-sm transition-all">
                                        {{ item.buyerName.slice(0,1) }}
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-[13px] text-primary-600 hover:underline font-medium leading-tight mb-0.5">{{ item.buyerName }}</span>
                                        <span class="text-[11px] text-slate-500 font-mono leading-tight">{{ item.buyerPhone }}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-3 align-top">
                                <span 
                                    class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border"
                                    :class="getStatusStyle(item.status)"
                                >
                                    {{ item.status }}
                                </span>
                            </td>
                            <td class="py-3 px-3 align-top">
                                <div class="flex items-center gap-1.5 text-[12px] text-slate-500 font-mono">
                                    <Clock class="w-3 h-3 text-slate-400" />
                                    {{ item.payTime }}
                                </div>
                            </td>
                            <td class="py-3 px-3 align-top text-right">
                                <button class="text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors bg-white px-2 py-1 rounded border border-transparent hover:border-primary-100 hover:shadow-sm" @click.stop="openDrawer(item)">
                                    详情
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Pagination -->
            <div class="px-5 py-3 border-t border-slate-200 bg-white text-xs text-slate-500 flex justify-between items-center">
                <span>显示 1 - {{ transactionList.length }} 共 {{ transactionList.length }} 条</span>
                <div class="flex gap-1">
                    <button class="px-2.5 py-1 border border-slate-200 bg-white rounded hover:bg-slate-50 disabled:opacity-50 transition-colors" disabled>上一页</button>
                    <button class="px-2.5 py-1 border border-slate-200 bg-white rounded hover:bg-slate-50 disabled:opacity-50 transition-colors" disabled>下一页</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Drawer (Using Teleport for correct overlay) -->
    <teleport to="body">
        <div 
            v-if="isDrawerOpen" 
            class="fixed inset-0 bg-slate-900/20 backdrop-blur-[1px] z-50 transition-opacity duration-300"
            @click="closeDrawer"
        ></div>

        <div 
            class="fixed top-0 right-0 h-full w-[640px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col border-l border-slate-200"
            :class="isDrawerOpen ? 'translate-x-0' : 'translate-x-full'"
            v-if="true" 
        >
             <div v-if="selectedTransaction" class="flex flex-col h-full bg-[#F3F5F7]">
                <!-- Header -->
                <div class="bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 shadow-sm z-10 sticky top-0">
                    <div class="flex items-start justify-between">
                         <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm">
                                <FileText class="w-5 h-5" />
                            </div>
                            <div>
                                <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">交易记录</p>
                                <h3 class="text-xl font-bold text-slate-900 leading-tight font-mono">{{ selectedTransaction.id }}</h3>
                            </div>
                         </div>
                         <button @click="closeDrawer" class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-all">
                            <X class="w-5 h-5" />
                         </button>
                    </div>
                    
                    <div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm grid grid-cols-4 gap-4 mt-2">
                         <div class="col-span-2 border-r border-slate-100 pr-4">
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">商品名称</span>
                            <div class="text-[13px] font-bold text-primary-600 hover:underline truncate cursor-pointer" :title="selectedTransaction.productName">{{ selectedTransaction.productName }}</div>
                        </div>
                         <div class="border-r border-slate-100 pr-4">
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">实付金额</span>
                            <div class="text-[13px] font-bold text-slate-900 font-mono">{{ selectedTransaction.amount }}</div>
                        </div>
                        <div>
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">状态</span>
                             <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">{{ selectedTransaction.status }}</span>
                        </div>

                        <div class="col-span-2 border-r border-slate-100 pr-4 pt-3 border-t border-slate-50">
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">买家信息</span>
                            <div class="text-[13px] text-slate-700 flex items-center gap-1.5">
                                <User class="w-3 h-3 text-slate-400" />
                                {{ selectedTransaction.buyerName }} 
                                <span class="text-slate-400">|</span> 
                                {{ selectedTransaction.buyerPhone }}
                            </div>
                        </div>
                        
                        <div class="border-r border-slate-100 pr-4 pt-3 border-t border-slate-50">
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">支付渠道</span>
                            <div class="text-[13px] text-slate-700 flex items-center gap-1.5">
                                <div v-if="selectedTransaction.method.includes('支付宝')" class="w-4 h-4 rounded-full bg-[#1677FF] flex items-center justify-center text-white text-[9px] font-bold shrink-0">支</div>
                                <div v-else-if="selectedTransaction.method.includes('微信')" class="w-4 h-4 rounded-full bg-[#07C160] flex items-center justify-center text-white text-[9px] font-bold shrink-0">微</div>
                                <Wallet v-else class="w-3.5 h-3.5 text-slate-400" />
                                {{ selectedTransaction.method }}
                            </div>
                        </div>

                        <div class="pt-3 border-t border-slate-50">
                            <span class="text-[10px] text-slate-500 font-semibold uppercase tracking-wide block mb-1">下单时间</span>
                            <div class="text-[12px] text-slate-600 font-mono whitespace-nowrap overflow-hidden text-ellipsis" :title="selectedTransaction.orderTime">{{ selectedTransaction.orderTime.split(' ')[0] }}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Body -->
                <div class="flex-1 overflow-y-auto p-4">
                    <div class="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                        <div class="px-4 py-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                            <h4 class="text-[13px] font-bold text-slate-800 flex items-center gap-2">
                                <TableIcon class="w-3.5 h-3.5 text-slate-500" />
                                学习记录 ({{ learningRecords.length }})
                            </h4>
                            <button class="text-[11px] font-bold text-primary-600 hover:underline">
                                全部导出
                            </button>
                        </div>
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th class="py-2 px-4 text-[10px] font-bold text-slate-500 uppercase">单元</th>
                                    <th class="py-2 px-4 text-[10px] font-bold text-slate-500 uppercase">课时</th>
                                    <th class="py-2 px-4 text-[10px] font-bold text-slate-500 uppercase">时长</th>
                                    <th class="py-2 px-4 text-[10px] font-bold text-slate-500 uppercase text-right">状态</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr v-for="record in learningRecords" :key="record.id" class="hover:bg-slate-50 transition-colors">
                                    <td class="py-3 px-4 text-[12px] text-slate-600">{{ record.unit }}</td>
                                    <td class="py-3 px-4">
                                        <div class="flex flex-col gap-0.5">
                                            <span class="text-[12px] text-slate-800 font-medium">{{ record.lesson }}</span>
                                            <span v-if="record.type === '直播'" class="text-[10px] text-emerald-600 flex items-center gap-1">
                                                <Video class="w-2.5 h-2.5" /> 直播
                                            </span>
                                            <span v-else class="text-[10px] text-blue-600 flex items-center gap-1">
                                                <Video class="w-2.5 h-2.5" /> 视频
                                            </span>
                                        </div>
                                    </td>
                                    <td class="py-3 px-4 text-[12px] text-slate-500 font-mono">{{ record.duration }}</td>
                                    <td class="py-3 px-4 text-right">
                                        <span 
                                            class="text-[11px]"
                                            :class="record.status === '已学习' ? 'text-emerald-700 font-bold' : 'text-slate-400'"
                                        >
                                            {{ record.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Footer -->
                 <div class="p-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-[10px] text-slate-400 px-6">
                    <span>Created by System</span>
                    <span>Last modified: Just now</span>
                </div>
             </div>
        </div>
    </teleport>
  </div>
  `
});