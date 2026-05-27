import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { 
  Search, Plus, ChevronDown, HelpCircle, CheckCircle2, Ban, 
  Image as ImageIcon, MoreHorizontal, Filter, RefreshCw, 
  LayoutList, Download, ArrowUpDown, BookOpen, Users, Wallet,
  Trash2, Copy, Edit, Share2, X, ChevronLeft, ChevronRight
} from 'lucide-vue-next';

export default defineComponent({
  name: 'CourseManagement',
  components: { 
    Search, Plus, ChevronDown, HelpCircle, CheckCircle2, Ban, 
    ImageIcon, MoreHorizontal, Filter, RefreshCw, LayoutList, 
    Download, ArrowUpDown, BookOpen, Users, Wallet,
    Trash2, Copy, Edit, Share2, X, ChevronLeft, ChevronRight
  },
  setup() {
    // Exact data match from screenshot
    const courses = ref([
      { id: '750162247340101', name: '韵儿老师的绘画课', type: '收费', price: '¥100.00', enrolled: 0, hours: 0, status: 'active', validity: '随到随学（30）天', cover: 'bg-orange-100 text-orange-500' },
      { id: '656956308897861', name: '质心学院', type: '免费', price: '免费', enrolled: 12, hours: 34, status: 'active', validity: '随到随学（365）天', cover: 'bg-blue-100 text-blue-500' },
      { id: '643555329273925', name: '春季物理', type: '收费', price: '¥9000.00', enrolled: 0, hours: 13, status: 'active', validity: '随到随学（365）天', cover: 'bg-purple-100 text-purple-500' },
      { id: '599987476398149', name: '课程2', type: '收费', price: '¥0.10', enrolled: 3, hours: 4, status: 'ended', validity: '随到随学（100）天', cover: 'bg-slate-100 text-slate-400' },
      { id: '599987294842949', name: '课程2', type: '收费', price: '¥1.00', enrolled: 1, hours: 2, status: 'ended', validity: '随到随学（100）天', cover: 'bg-slate-100 text-slate-400' },
      { id: '599987066277957', name: '联报课程1', type: '免费', price: '免费', enrolled: 0, hours: 0, status: 'ended', validity: '随到随学（100）天', cover: 'bg-emerald-100 text-emerald-500' },
      { id: '587691343650885', name: '关于claude', type: '收费', price: '¥1000.00', enrolled: 0, hours: 1, status: 'ended', validity: '随到随学（13）天', cover: 'bg-indigo-100 text-indigo-500' },
      { id: '561905469251653', name: '演示课程', type: '免费', price: '免费', enrolled: 9, hours: 7, status: 'ended', validity: '长期有效', cover: 'bg-pink-100 text-pink-500' },
      // Duplicate data to demonstrate pagination
      { id: '750162247340102', name: '进阶素描课', type: '收费', price: '¥120.00', enrolled: 5, hours: 10, status: 'active', validity: '随到随学（30）天', cover: 'bg-orange-100 text-orange-500' },
      { id: '656956308897863', name: '高等数学', type: '免费', price: '免费', enrolled: 22, hours: 40, status: 'active', validity: '随到随学（365）天', cover: 'bg-blue-100 text-blue-500' },
      { id: '643555329273926', name: '量子力学入门', type: '收费', price: '¥500.00', enrolled: 2, hours: 20, status: 'active', validity: '随到随学（365）天', cover: 'bg-purple-100 text-purple-500' },
      { id: '599987476398150', name: '英语口语', type: '收费', price: '¥50.00', enrolled: 8, hours: 12, status: 'active', validity: '随到随学（100）天', cover: 'bg-emerald-100 text-emerald-500' },
    ]);

    const stats = computed(() => {
        const totalCourses = courses.value.length;
        const totalEnrolled = courses.value.reduce((acc, curr) => acc + curr.enrolled, 0);
        const activeCourses = courses.value.filter(c => c.status === 'active').length;
        return { totalCourses, totalEnrolled, activeCourses };
    });

    const activeDropdown = ref<string | null>(null);
    const selectedIds = ref<string[]>([]);

    // --- Pagination Logic ---
    const currentPage = ref(1);
    const pageSize = ref(10);

    const totalItems = computed(() => courses.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
    
    const paginatedList = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return courses.value.slice(start, end);
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

    // --- Actions ---
    const toggleDropdown = (id: string) => {
        if (activeDropdown.value === id) {
            activeDropdown.value = null;
        } else {
            activeDropdown.value = id;
        }
    };

    const toggleSelection = (id: string) => {
        if (selectedIds.value.includes(id)) {
            selectedIds.value = selectedIds.value.filter(item => item !== id);
        } else {
            selectedIds.value.push(id);
        }
    };

    const toggleAll = (event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            selectedIds.value = courses.value.map(c => c.id);
        } else {
            selectedIds.value = [];
        }
    };

    const clearSelection = () => {
        selectedIds.value = [];
    };

    const isAllSelected = computed(() => {
        return courses.value.length > 0 && selectedIds.value.length === courses.value.length;
    });

    const bulkActionType = ref('');
    const showBulkConfirmModal = ref(false);

    const confirmBulkAction = (type: string) => {
        bulkActionType.value = type;
        showBulkConfirmModal.value = true;
    };

    const executeBulkAction = () => {
        if (bulkActionType.value === 'delete') {
            courses.value = courses.value.filter(c => !selectedIds.value.includes(c.id));
        } else if (bulkActionType.value === 'deactivate') {
            courses.value.forEach(c => {
                if (selectedIds.value.includes(c.id)) {
                    c.status = 'ended';
                }
            });
        }
        clearSelection();
        showBulkConfirmModal.value = false;
    };

    // Close dropdown when clicking outside
    onMounted(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.action-dropdown-container')) {
                activeDropdown.value = null;
            }
        };
        document.addEventListener('click', handleClickOutside);
        
        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });
    });

    return { 
        courses, stats, activeDropdown, toggleDropdown,
        selectedIds, toggleSelection, toggleAll, isAllSelected, clearSelection,
        bulkActionType, showBulkConfirmModal, confirmBulkAction, executeBulkAction,
        // Pagination
        currentPage, pageSize, totalPages, paginatedList, paginatedInfo, visiblePages, nextPage, prevPage
    };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F3F5F7] font-sans p-4 space-y-4 relative overflow-hidden">
    
    <!-- Highlights Panel (Metrics) - Compact Version -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-primary-200 transition-colors">
            <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <BookOpen class="w-5 h-5" />
            </div>
            <div>
                <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">在线课程</p>
                <div class="flex items-baseline gap-2">
                    <h3 class="text-xl font-bold text-slate-800 tabular-nums">{{ stats.totalCourses }}</h3>
                    <span class="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{{ stats.activeCourses }} 报名中</span>
                </div>
            </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center gap-4 relative overflow-hidden group hover:border-purple-200 transition-colors">
            <div class="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                <Users class="w-5 h-5" />
            </div>
            <div>
                <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">累计学员</p>
                <h3 class="text-xl font-bold text-slate-800 tabular-nums">{{ stats.totalEnrolled }}</h3>
            </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-amber-200 transition-colors">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
                    <Wallet class="w-5 h-5" />
                </div>
                <div>
                    <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                        果点余额 <HelpCircle class="w-3 h-3 text-slate-300" />
                    </p>
                    <h3 class="text-xl font-bold text-slate-800 tabular-nums">701.2</h3>
                </div>
            </div>
            <div class="flex flex-col gap-1.5">
                 <button class="text-[11px] font-bold text-white bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded transition-colors shadow-sm shadow-primary-500/20">充值</button>
                 <button class="text-[11px] font-medium text-slate-500 hover:text-primary-600 transition-colors">明细</button>
            </div>
        </div>
    </div>

    <!-- Main Content Container -->
    <div class="flex flex-col flex-1 gap-0 min-h-0">
        <!-- Section Title with Actions -->
        <div class="flex justify-between items-center mb-3 px-1 shrink-0">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                课程管理
                <span class="bg-slate-100 text-slate-500 text-xs py-0.5 px-2 rounded-full tabular-nums">{{ stats.totalCourses }}</span>
            </h2>
            <button class="px-4 py-1.5 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/20 flex items-center gap-1.5">
                <Plus class="w-4 h-4" />
                创建课程
            </button>
        </div>

        <div class="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden relative">
            
            <!-- Modern Filter Bar -->
            <div class="p-4 border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-slate-50/50 shrink-0">
                
                <div class="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    <!-- Integrated Search Input -->
                    <div class="relative group">
                        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="搜索课程名称或ID..." 
                            class="pl-9 pr-3 py-1.5 border border-slate-300 bg-white rounded text-sm w-64 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all placeholder:text-slate-400" 
                        />
                    </div>
                    
                    <!-- Filters -->
                    <div class="h-8 w-[1px] bg-slate-200 mx-1 hidden xl:block"></div>

                    <div class="relative">
                        <select class="appearance-none bg-white border border-slate-300 text-slate-600 text-sm rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-primary-500 hover:border-slate-400 transition-colors cursor-pointer min-w-[100px]">
                            <option>所有状态</option>
                            <option>报名中</option>
                            <option>报名结束</option>
                        </select>
                        <ChevronDown class="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div class="relative">
                        <select class="appearance-none bg-white border border-slate-300 text-sm rounded px-3 py-1.5 pr-8 focus:outline-none focus:border-primary-500 hover:border-slate-400 transition-colors cursor-pointer min-w-[120px] text-slate-600">
                            <option value="" selected>所有类别</option>
                            <option>收费</option>
                            <option>免费</option>
                        </select>
                        <ChevronDown class="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-slate-100 rounded transition-colors" title="重置筛选">
                        <RefreshCw class="w-4 h-4" />
                    </button>
                </div>

                <!-- View Options / Bulk Assistant Trigger (Visible when nothing selected) -->
                <div class="flex items-center gap-2" v-if="selectedIds.length === 0">
                    <button class="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">
                        <Filter class="w-4 h-4" />
                    </button>
                    <button class="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors">
                        <LayoutList class="w-4 h-4" />
                    </button>
                </div>
            </div>

            <!-- Data Table -->
            <div class="flex-1 overflow-auto custom-scrollbar relative">
                <table class="w-full text-left border-collapse min-w-[1000px]">
                    <thead class="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                    <tr>
                        <th class="py-3 px-4 w-12 border-b border-slate-200">
                        <input 
                            type="checkbox" 
                            class="rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4 align-middle transition-colors" 
                            :checked="isAllSelected"
                            @change="toggleAll"
                        />
                        </th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200">课程名称</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200 font-mono">ID</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200">类别/价格</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200 text-right">报名人数</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200 text-right">课时</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200">状态</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200">有效期</th>
                        <th class="py-3 px-4 text-xs font-semibold text-slate-500 border-b border-slate-200 min-w-[200px]">操作</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                    <tr v-for="course in paginatedList" :key="course.id" class="hover:bg-slate-50/80 transition-colors group" :class="{'bg-primary-50/40': selectedIds.includes(course.id)}">
                        <td class="py-4 px-4 align-middle">
                            <input 
                                type="checkbox" 
                                class="rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer w-4 h-4 transition-colors" 
                                :checked="selectedIds.includes(course.id)"
                                @change="toggleSelection(course.id)"
                            />
                        </td>
                        <td class="py-4 px-4 align-middle">
                        <div class="flex items-center gap-3">
                                <!-- Thumbnail -->
                                <div class="w-9 h-9 rounded border border-slate-200 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105" :class="course.cover">
                                    <ImageIcon class="w-4 h-4 opacity-70" />
                                </div>
                                <a href="#" class="text-sm font-bold text-slate-700 hover:text-primary-600 hover:underline leading-snug transition-colors">{{ course.name }}</a>
                        </div>
                        </td>
                        <td class="py-4 px-4 align-middle text-xs text-slate-500 font-mono tabular-nums">{{ course.id }}</td>
                        <td class="py-4 px-4 align-middle text-sm text-slate-600">
                            <div class="flex items-center gap-2">
                                <span class="px-1.5 py-0.5 rounded text-[10px] font-medium border"
                                      :class="course.type === '免费' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-blue-200 text-blue-600 bg-blue-50'">
                                    {{ course.type }}
                                </span>
                                <span v-if="course.price !== '免费'" class="text-slate-600 font-medium tabular-nums text-xs">{{ course.price }}</span>
                            </div>
                        </td>
                        <td class="py-4 px-4 align-middle text-right text-sm font-medium text-slate-700 tabular-nums">{{ course.enrolled }}</td>
                        <td class="py-4 px-4 align-middle text-right text-sm font-medium text-slate-500 tabular-nums">{{ course.hours }}</td>
                        <td class="py-4 px-4 align-middle">
                            <span 
                                v-if="course.status === 'active'" 
                                class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                报名中
                            </span>
                            <span 
                                v-else 
                                class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200"
                            >
                                <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                报名结束
                            </span>
                        </td>
                        <td class="py-4 px-4 align-middle text-sm text-slate-500">{{ course.validity }}</td>
                        <td class="py-4 px-4 align-middle relative action-dropdown-container">
                             <div class="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                <button class="text-[12px] font-medium text-slate-500 hover:text-primary-600 transition-colors">详情</button>
                                <button class="text-[12px] font-medium text-slate-500 hover:text-primary-600 transition-colors">复制链接</button>
                                <div class="relative">
                                    <button 
                                        @click.stop="toggleDropdown(course.id)"
                                        class="flex items-center justify-center w-6 h-6 rounded hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-colors focus:outline-none"
                                    >
                                        <MoreHorizontal class="w-4 h-4" />
                                    </button>
                                    
                                    <!-- Dropdown Menu -->
                                    <div 
                                        v-if="activeDropdown === course.id"
                                        class="absolute right-0 top-full mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 flex flex-col animate-fade-in origin-top-right"
                                    >
                                        <button class="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-primary-600 w-full transition-colors">
                                            <Edit class="w-3.5 h-3.5" /> 编辑
                                        </button>
                                        <button class="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-primary-600 w-full transition-colors">
                                            <Copy class="w-3.5 h-3.5" /> 复制
                                        </button>
                                        <div class="h-[1px] bg-slate-100 my-1"></div>
                                        <button class="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-primary-600 w-full transition-colors">
                                            <Users class="w-3.5 h-3.5" /> 成员
                                        </button>
                                        <button class="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-red-600 w-full transition-colors">
                                            <Trash2 class="w-3.5 h-3.5" /> 删除
                                        </button>
                                    </div>
                                </div>
                             </div>
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

    <!-- Floating Bulk Action Bar -->
    <div 
        v-if="selectedIds.length > 0"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-6 z-50 animate-fade-in border border-slate-700/50"
    >
        <div class="flex items-center gap-3 border-r border-slate-700 pr-4">
            <span class="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{{ selectedIds.length }}</span>
            <span class="text-sm font-medium">项已选择</span>
        </div>
        <div class="flex items-center gap-2">
            <button @click="confirmBulkAction('deactivate')" class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white flex flex-col items-center gap-1 group" title="批量下架">
                <Ban class="w-4 h-4" />
                <span class="text-[10px] hidden group-hover:block absolute -top-8 bg-black px-2 py-1 rounded">下架</span>
            </button>
             <button @click="confirmBulkAction('delete')" class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white flex flex-col items-center gap-1 group" title="批量删除">
                <Trash2 class="w-4 h-4" />
            </button>
             <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white flex flex-col items-center gap-1 group" title="更多操作">
                <MoreHorizontal class="w-4 h-4" />
            </button>
        </div>
        <button @click="clearSelection" class="ml-2 hover:bg-slate-700 p-1 rounded-full transition-colors">
            <X class="w-4 h-4 text-slate-400" />
        </button>
    </div>

    <!-- Bulk Action Confirm Modal -->
    <div v-if="showBulkConfirmModal" class="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[60] animate-fade-in">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden text-center">
            <div class="p-6">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" :class="bulkActionType === 'delete' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'">
                    <Trash2 v-if="bulkActionType === 'delete'" class="w-6 h-6" />
                    <Ban v-else class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">
                    {{ bulkActionType === 'delete' ? '确认删除' : '确认下架' }}
                </h3>
                <p class="text-sm text-slate-500">
                    您确定要{{ bulkActionType === 'delete' ? '删除' : '下架' }}选中的 {{ selectedIds.length }} 门课程吗？此操作不可恢复。
                </p>
            </div>
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                <button @click="showBulkConfirmModal = false" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">取消</button>
                <button @click="executeBulkAction" class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm" :class="bulkActionType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'">
                    确认{{ bulkActionType === 'delete' ? '删除' : '下架' }}
                </button>
            </div>
        </div>
    </div>

  </div>
  `
});