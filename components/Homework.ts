import { defineComponent, ref, computed } from 'vue';
import { 
  Search, HelpCircle, FileText, Filter, RefreshCw, 
  BookOpen, Layers, MoreHorizontal, Eye, Plus, Info,
  ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Homework',
  components: { 
    Search, HelpCircle, FileText, Filter, RefreshCw, 
    BookOpen, Layers, MoreHorizontal, Eye, Plus, Info,
    ChevronLeft, ChevronRight, ChevronDown
  },
  setup() {
    const activeTab = ref('course-homework');
    
    // Data matched exactly from the provided screenshot
    const courseList = ref([
      { 
        id: '750162247340101', 
        name: '韵儿老师的绘画课', 
        homeworkCount: 1, 
        studentCount: 0, 
        pendingCount: 0 
      },
      { 
        id: '656956308897861', 
        name: '质心学院', 
        homeworkCount: 2, 
        studentCount: 13, 
        pendingCount: 0 
      },
      { 
        id: '643555329273925', 
        name: '春季物理', 
        homeworkCount: 1, 
        studentCount: 0, 
        pendingCount: 0 
      },
      // Adding dummy data for pagination
       { id: '123456789012345', name: '数学思维训练', homeworkCount: 3, studentCount: 25, pendingCount: 5 },
       { id: '234567890123456', name: '少儿编程入门', homeworkCount: 5, studentCount: 18, pendingCount: 2 },
       { id: '345678901234567', name: '趣味英语', homeworkCount: 2, studentCount: 30, pendingCount: 1 },
       { id: '456789012345678', name: '科学实验课', homeworkCount: 1, studentCount: 12, pendingCount: 0 },
       { id: '567890123456789', name: '古诗词鉴赏', homeworkCount: 4, studentCount: 40, pendingCount: 8 },
       { id: '678901234567890', name: '硬笔书法', homeworkCount: 2, studentCount: 15, pendingCount: 0 },
       { id: '789012345678901', name: '乐高搭建', homeworkCount: 1, studentCount: 10, pendingCount: 0 },
       { id: '890123456789012', name: '围棋启蒙', homeworkCount: 3, studentCount: 20, pendingCount: 3 },
       { id: '901234567890123', name: '声乐基础', homeworkCount: 1, studentCount: 8, pendingCount: 0 },
    ]);

     // --- Pagination Logic ---
    const currentPage = ref(1);
    const pageSize = ref(10);

    const totalItems = computed(() => courseList.value.length);
    const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
    
    const paginatedList = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value;
        const end = start + pageSize.value;
        return courseList.value.slice(start, end);
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


    return { 
        activeTab, courseList,
        // Pagination
        currentPage, pageSize, totalPages, paginatedList, paginatedInfo, visiblePages, nextPage, prevPage
    };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F8FAFC] font-sans p-6 space-y-4 animate-fade-in relative overflow-hidden">
    
    <!-- Info Banner (Replaces redundant header) -->
    <div class="flex justify-between items-start md:items-center px-1 shrink-0">
        <div class="flex items-center gap-2 text-sm text-slate-500">
             <div class="w-1 h-4 bg-primary-500 rounded-full mr-1"></div>
             <p>可创建作业、管理已有作业记录(模板)，适用于课程作业、随堂测验等场景。</p>
        </div>
        <button class="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm">
            <HelpCircle class="w-4 h-4" />
            <span>使用帮助</span>
        </button>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden relative">
        
        <!-- Tabs Header -->
        <div class="border-b border-slate-200 flex flex-col md:flex-row items-center justify-between px-2 bg-slate-50/50 shrink-0">
             <div class="flex self-stretch">
                <button 
                    @click="activeTab = 'course-homework'"
                    class="group px-6 py-4 flex items-center gap-2.5 text-sm font-bold border-b-2 transition-all relative top-[1px]"
                    :class="activeTab === 'course-homework' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'"
                >
                    <BookOpen class="w-4 h-4 transition-transform group-hover:scale-110" :class="activeTab === 'course-homework' ? 'text-primary-500' : 'text-slate-400'" />
                    课程作业
                </button>
                 <button 
                    @click="activeTab = 'homework-library'"
                    class="group px-6 py-4 flex items-center gap-2.5 text-sm font-bold border-b-2 transition-all relative top-[1px]"
                    :class="activeTab === 'homework-library' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'"
                >
                    <Layers class="w-4 h-4 transition-transform group-hover:scale-110" :class="activeTab === 'homework-library' ? 'text-primary-500' : 'text-slate-400'" />
                    作业库
                </button>
            </div>
        </div>

        <!-- Toolbar (Matching Screenshot Fields) -->
        <div class="p-5 border-b border-slate-100 bg-white shrink-0">
             <div class="flex flex-wrap items-center gap-4">
                 
                 <!-- Course Name Input -->
                 <div class="flex items-center gap-2">
                    <label class="text-sm font-bold text-slate-700">课程名:</label>
                    <div class="relative group w-64">
                        <input 
                            type="text" 
                            placeholder="请输入" 
                            class="px-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-lg w-full focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500/20 transition-all" 
                        />
                    </div>
                 </div>

                 <!-- Status Select -->
                 <div class="flex items-center gap-2">
                    <label class="text-sm font-bold text-slate-700">批改情况:</label>
                    <div class="relative">
                        <select class="appearance-none bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all cursor-pointer min-w-[120px]">
                            <option value="all">全部</option>
                            <option value="pending">待批改</option>
                            <option value="completed">已批改</option>
                        </select>
                        <ChevronDown class="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                 </div>

                 <!-- Buttons -->
                 <div class="flex items-center gap-3 ml-2">
                     <button class="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all hover:shadow-md flex items-center gap-2 transform active:scale-95">
                        <Search class="w-4 h-4" />
                        搜索
                     </button>
                     <button class="px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-lg transition-all transform active:scale-95">
                        重置
                     </button>
                 </div>
             </div>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto custom-scrollbar">
            <table class="w-full text-left border-collapse min-w-[900px]">
                <thead class="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200 w-20">序号</th>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200">课程名</th>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200 text-center w-32">作业份数</th>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200 text-center w-32">学员数</th>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200 text-center w-40">
                            <div class="inline-flex items-center gap-1">
                                待批改总数
                                <Info class="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </div>
                        </th>
                        <th class="py-4 px-6 text-xs font-bold text-slate-500 border-b border-slate-200 w-24 text-center">操作</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(item, index) in paginatedList" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
                        <td class="py-5 px-6 text-sm text-slate-500 align-middle font-mono">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                        <td class="py-5 px-6 align-middle">
                            <div class="flex flex-col gap-0.5">
                                <p class="text-sm text-slate-800 font-bold group-hover:text-primary-600 transition-colors">{{ item.name }}</p>
                                <p class="text-[11px] text-slate-400 font-mono tracking-tight">课程ID: {{ item.id }}</p>
                            </div>
                        </td>
                        <td class="py-5 px-6 text-sm text-slate-700 font-medium align-middle text-center tabular-nums">{{ item.homeworkCount }}</td>
                        <td class="py-5 px-6 text-sm text-slate-700 font-medium align-middle text-center tabular-nums">{{ item.studentCount }}</td>
                        <td class="py-5 px-6 text-sm text-slate-700 font-medium align-middle text-center tabular-nums">{{ item.pendingCount }}</td>
                        <td class="py-5 px-6 align-middle text-center">
                            <button class="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline transition-colors">
                                查看
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
  `
});