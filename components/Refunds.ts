import { defineComponent, ref, computed } from 'vue';
import { 
  Search, RotateCcw, Download, HelpCircle, 
  ChevronDown, AlertCircle, CheckCircle2, 
  Clock, FileText, User, CreditCard, Wallet,
  ExternalLink, ChevronLeft, ChevronRight
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Refunds',
  components: { 
    Search, RotateCcw, Download, HelpCircle, 
    ChevronDown, AlertCircle, CheckCircle2, 
    Clock, FileText, User, CreditCard, Wallet,
    ExternalLink, ChevronLeft, ChevronRight
  },
  setup() {
    // Mock Data based on the screenshot provided
    const refundList = ref([
      { 
        refundId: '543052667069399044',
        refundAmount: '¥0.01',
        status: '同意退款',
        statusDesc: '',
        productName: '讨论互联网产品设计',
        productId: '618804370858053',
        validity: '随到随学（100）天',
        transId: 'G543052548840357892',
        transAmount: '¥0.01',
        method: '支付宝',
        transTime: '2024-12-03 16:22:34',
        buyerName: '666',
        buyerPhone: '186****5751'
      },
      { 
        refundId: '543049914129580036',
        refundAmount: '¥0.01',
        status: '同意退款',
        statusDesc: '',
        productName: '讨论互联网产品设计',
        productId: '618804370858053',
        validity: '随到随学（100）天',
        transId: 'G543048545108754436',
        transAmount: '¥0.01',
        method: '支付宝',
        transTime: '2024-12-03 15:42:49',
        buyerName: '周亚鹏',
        buyerPhone: '183****1574'
      },
      { 
        refundId: '543201391854747651',
        refundAmount: '¥0.01',
        status: '同意退款',
        statusDesc: '',
        productName: '产品设计',
        productId: '568844025417797',
        validity: '随到随学 (1095) 天',
        transId: 'G543056553360490500',
        transAmount: '¥0.01',
        method: '微信',
        transTime: '2024-12-03 17:02:33',
        buyerName: '慧星0045',
        buyerPhone: '173****0045'
      },
      { 
        refundId: '535342871453106180',
        refundAmount: '¥0.50',
        status: '同意退款',
        statusDesc: '2',
        productName: '课程2',
        productId: '599987294842949',
        validity: '随到随学（100）天',
        transId: 'G535342787298590724',
        transAmount: '¥0.55',
        method: '微信',
        transTime: '2024-10-11 11:53:21',
        buyerName: '老赵',
        buyerPhone: '152****2254'
      },
      // Extra data for pagination
      { 
        refundId: '535342871453106181',
        refundAmount: '¥100.00',
        status: '待处理',
        statusDesc: '',
        productName: '高级插画课',
        productId: '599987294842950',
        validity: '随到随学（100）天',
        transId: 'G535342787298590725',
        transAmount: '¥100.00',
        method: '微信',
        transTime: '2024-10-12 09:20:10',
        buyerName: '张三',
        buyerPhone: '139****1234'
      },
       { 
        refundId: '535342871453106182',
        refundAmount: '¥299.00',
        status: '拒绝退款',
        statusDesc: '超过退款期限',
        productName: 'Python全栈开发',
        productId: '599987294842951',
        validity: '随到随学（365）天',
        transId: 'G535342787298590726',
        transAmount: '¥299.00',
        method: '支付宝',
        transTime: '2024-09-01 14:15:22',
        buyerName: '李四',
        buyerPhone: '158****5678'
      }
    ]);

    // --- Pagination Logic ---
    const currentPage = ref(1);
    const pageSize = ref(10);

    const totalItems = computed(() => refundList.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
    
    const paginatedList = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return refundList.value.slice(start, end);
    });

    const paginatedInfo = computed(() => {
        if (totalItems.value === 0) return { start: 0, end: 0, total: 0 };
        const start = (currentPage.value - 1) * pageSize.value + 1;
        const end = Math.min(currentPage.value * pageSize.value, totalItems.value);
        return { start, end, total: totalItems.value };
    });

    const visiblePages = computed(() => {
        const total = totalPages.value;
        const current = currentPage.value;
        const delta = 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);
        for (let i = current - delta; i <= current + delta; i++) {
            if (i < total && i > 1) {
                range.push(i);
            }
        }
        if (total > 1) range.push(total);

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        return rangeWithDots;
    });

    const nextPage = () => {
        if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
        if (currentPage.value > 1) currentPage.value--;
    };

    // UI Helper for Status Badges
    const getStatusStyle = (status) => {
        if (status === '同意退款') return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
        if (status === '拒绝退款') return 'bg-rose-50 text-rose-700 border border-rose-100';
        if (status === '待处理') return 'bg-amber-50 text-amber-700 border border-amber-100';
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    };

    return { 
        refundList,
        getStatusStyle,
        // Pagination
        currentPage, pageSize, totalPages, paginatedList, paginatedInfo, visiblePages, nextPage, prevPage
    };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F3F5F7] font-sans p-4 space-y-3 relative overflow-hidden">
    
    <!-- 1. Top Section: Metrics (Consistent with Finance Page) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
        <!-- Card 1: Refund Requests (Orange Anchor for Action/Pending) -->
        <div class="bg-white border border-slate-200 border-l-4 border-l-orange-500 rounded-r rounded-l-[1px] p-4 shadow-sm flex items-center justify-around hover:shadow-md transition-shadow group">
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日退款申请</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums">0</h3>
            </div>
            <div class="w-px h-8 bg-slate-100"></div>
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日退款申请金额</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums font-mono">0.00</h3>
            </div>
        </div>

        <!-- Card 2: Approved Refunds (Green Anchor for Completed) -->
        <div class="bg-white border border-slate-200 border-l-4 border-l-[#07C160] rounded-r rounded-l-[1px] p-4 shadow-sm flex items-center justify-around hover:shadow-md transition-shadow group">
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日同意退款</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums">0</h3>
            </div>
             <div class="w-px h-8 bg-slate-100"></div>
            <div class="flex flex-col items-center gap-1">
                <p class="text-xs text-slate-500">今日同意退款金额</p>
                <h3 class="text-2xl font-medium text-slate-800 tabular-nums font-mono">0.00</h3>
            </div>
        </div>
    </div>

    <!-- 2. Main Content Container -->
    <div class="flex flex-col flex-1 gap-0 min-h-0">
        
        <!-- Table Card -->
        <div class="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden relative">
            
            <!-- Toolbar (Redesigned Filter Area) -->
            <div class="px-4 py-3 border-b border-slate-200 flex flex-col xl:flex-row items-center justify-between gap-3 bg-white shrink-0">
                 <!-- Filters Left -->
                 <div class="flex flex-wrap items-center gap-2 w-full xl:w-auto">
                    <!-- Refund ID Input -->
                    <div class="relative">
                        <input type="text" placeholder="退款单号" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-36 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>

                    <!-- Status Select -->
                    <div class="relative">
                        <select class="appearance-none bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 text-slate-600 text-xs rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-primary-500 cursor-pointer min-w-[100px] transition-all">
                            <option value="" disabled selected>退款状态</option>
                            <option value="agreed">同意退款</option>
                            <option value="refused">拒绝退款</option>
                            <option value="pending">待处理</option>
                        </select>
                        <ChevronDown class="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <!-- Product Name Input -->
                    <div class="relative">
                         <input type="text" placeholder="商品名称" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-32 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>

                    <!-- Buyer Nickname Input -->
                    <div class="relative">
                         <input type="text" placeholder="买家昵称" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-28 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>

                    <!-- Buyer Phone Input -->
                    <div class="relative">
                         <input type="text" placeholder="买家手机" class="pl-3 pr-3 py-1.5 border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white rounded text-xs w-28 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" />
                    </div>
                    
                    <div class="w-[1px] h-5 bg-slate-200 mx-1"></div>

                    <button class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded shadow-sm transition-colors flex items-center gap-1">
                        <Search class="w-3 h-3" /> 搜索
                    </button>
                    <button class="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 text-xs font-medium rounded transition-colors flex items-center gap-1">
                        <RotateCcw class="w-3 h-3" /> 重置
                    </button>
                 </div>

                 <!-- Actions Right -->
                 <div class="flex items-center gap-2 ml-auto xl:ml-0 w-full xl:w-auto justify-end">
                      <!-- Using Help Icon consistent with Finance page -->
                      <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors" title="使用帮助">
                        <HelpCircle class="w-4 h-4" />
                    </button>
                 </div>
            </div>

            <!-- Table Area -->
            <div class="flex-1 overflow-auto custom-scrollbar relative">
                <table class="w-full text-left border-collapse min-w-[1200px]">
                    <thead class="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                        <tr>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pl-6">退款申请</th>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">退款单号 / 状态</th>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">商品信息</th>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">交易信息</th>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">买家信息</th>
                            <th class="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right pr-6">操作</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr 
                            v-for="item in paginatedList" 
                            :key="item.refundId" 
                            class="hover:bg-primary-50/40 transition-colors group"
                        >
                            <!-- Refund Info -->
                            <td class="py-4 px-4 align-top pl-6">
                                <div class="flex flex-col gap-1">
                                    <div class="flex items-baseline gap-1">
                                         <span class="text-[10px] text-slate-500">退款</span>
                                         <span class="text-sm font-bold text-slate-900 font-mono">{{ item.refundAmount }}</span>
                                    </div>
                                    <span class="text-[10px] font-bold text-primary-600 hover:underline cursor-pointer flex items-center gap-0.5">
                                        查看详情 <ExternalLink class="w-2.5 h-2.5" />
                                    </span>
                                </div>
                            </td>

                            <!-- Refund ID & Status -->
                            <td class="py-4 px-4 align-top">
                                <div class="flex flex-col gap-1.5">
                                    <span class="text-[11px] text-slate-500 font-mono select-all">{{ item.refundId }}</span>
                                    <div class="flex flex-col items-start gap-1">
                                        <span 
                                            class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border"
                                            :class="getStatusStyle(item.status)"
                                        >
                                            {{ item.status }}
                                        </span>
                                        <span v-if="item.statusDesc" class="text-[10px] text-slate-400 leading-tight max-w-[120px]">
                                            描述: {{ item.statusDesc }}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <!-- Product Info -->
                            <td class="py-4 px-4 align-top">
                                <div class="flex flex-col gap-1 max-w-[240px]">
                                    <div class="text-[12px] font-bold text-slate-800 leading-snug">{{ item.productName }}</div>
                                    <div class="text-[10px] text-slate-400 font-mono">ID: {{ item.productId }}</div>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                                            {{ item.validity.replace('随到随学', '').replace('（', '').replace('）', '天') }}
                                        </span>
                                        <span class="text-[10px] text-primary-600 hover:underline cursor-pointer">使用详情</span>
                                    </div>
                                </div>
                            </td>

                            <!-- Transaction Info -->
                            <td class="py-4 px-4 align-top">
                                <div class="flex flex-col gap-1">
                                    <div class="text-[11px] text-slate-500 font-mono select-all">{{ item.transId }}</div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-[12px] font-bold text-slate-800 font-mono">{{ item.transAmount }}</span>
                                        <span v-if="item.method.includes('支付宝')" class="text-[10px] text-blue-600 bg-blue-50 px-1 rounded">支付宝</span>
                                        <span v-else-if="item.method.includes('微信')" class="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded">微信</span>
                                    </div>
                                    <div class="text-[10px] text-slate-400 font-mono">{{ item.transTime }}</div>
                                </div>
                            </td>

                            <!-- Buyer Info -->
                            <td class="py-4 px-4 align-top">
                                <div class="flex items-start gap-2">
                                    <div class="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 uppercase mt-0.5 shrink-0">
                                        {{ item.buyerName.slice(0,1) }}
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-[12px] text-indigo-600 hover:underline font-medium leading-tight mb-0.5 cursor-pointer">{{ item.buyerName }}</span>
                                        <span class="text-[11px] text-slate-500 font-mono leading-tight">{{ item.buyerPhone }}</span>
                                    </div>
                                </div>
                            </td>

                            <!-- Operation -->
                            <td class="py-4 px-4 align-top text-right pr-6">
                                <button 
                                    class="text-[11px] font-medium px-2.5 py-1.5 rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="item.status === '待处理' 
                                        ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 shadow-sm' 
                                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600'"
                                    :disabled="item.status !== '待处理'"
                                >
                                    {{ item.status === '待处理' ? '处理退款' : '已处理' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer Pagination (New Design) -->
            <div class="px-5 py-4 border-t border-slate-200 bg-white flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
                <!-- Left Side: Info & Page Size -->
                <div class="flex items-center gap-4 text-xs text-slate-500">
                    <span>显示 {{ paginatedInfo.start }} 至 {{ paginatedInfo.end }} 共 {{ paginatedInfo.total }} 条结果</span>
                    <div class="flex items-center gap-2">
                        <span>每页:</span>
                        <div class="relative">
                            <select 
                                v-model="pageSize" 
                                @change="currentPage = 1"
                                class="appearance-none bg-white border border-slate-200 rounded px-3 py-1 pr-8 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 cursor-pointer text-slate-700 font-medium transition-all hover:border-slate-300"
                            >
                                <option :value="10">10</option>
                                <option :value="20">20</option>
                                <option :value="50">50</option>
                            </select>
                            <ChevronDown class="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <!-- Right Side: Pagination Controls -->
                <div class="flex items-center gap-1.5">
                    <!-- Prev -->
                    <button 
                        @click="prevPage" 
                        :disabled="currentPage === 1"
                        class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-all shadow-sm"
                    >
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    
                    <!-- Pages -->
                    <template v-for="(page, index) in visiblePages" :key="index">
                        <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">...</span>
                        <button 
                            v-else
                            @click="currentPage = page"
                            class="w-8 h-8 flex items-center justify-center rounded border text-xs font-bold transition-all shadow-sm"
                            :class="currentPage === page 
                                ? 'border-primary-600 text-primary-600 bg-primary-50' 
                                : 'border-slate-200 bg-white text-slate-600 hover:border-primary-500 hover:text-primary-600'"
                        >
                            {{ page }}
                        </button>
                    </template>

                    <!-- Next -->
                    <button 
                        @click="nextPage" 
                        :disabled="currentPage === totalPages"
                        class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:border-primary-500 hover:text-primary-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-all shadow-sm"
                    >
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
  `
});