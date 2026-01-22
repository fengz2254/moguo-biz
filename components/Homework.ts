import { defineComponent, ref } from 'vue';
import { 
  Search, Plus, HelpCircle, FileText, Filter, RefreshCw, 
  Edit, Trash2, BookOpen, Layers, MoreHorizontal, Calendar,
  Clock, CheckCircle2, AlertCircle, ChevronDown
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Homework',
  components: { 
    Search, Plus, HelpCircle, FileText, Filter, RefreshCw, 
    Edit, Trash2, BookOpen, Layers, MoreHorizontal, Calendar,
    Clock, CheckCircle2, AlertCircle, ChevronDown
  },
  setup() {
    const activeTab = ref('course-homework');
    
    // Exact data match from the screenshot
    const homeworks = ref([
      { id: 1, type: '自定义', name: '作业 03-26 星期三', updatedAt: '2025-03-26 17:32:30', creator: '赵老师', status: 'published' },
      { id: 2, type: '自定义', name: '作业 03-26 星期三', updatedAt: '2025-03-26 11:22:02', creator: '赵老师', status: 'draft' },
      { id: 3, type: '自定义', name: '作业 03-21 星期五', updatedAt: '2025-03-21 10:59:02', creator: '赵老师', status: 'published' },
      { id: 4, type: '试卷', name: '作业 02-26 星期三', updatedAt: '2025-03-17 15:29:38', creator: '赵老师', status: 'published' },
      { id: 5, type: '试卷', name: '英语作业', updatedAt: '2025-03-17 15:29:42', creator: '赵老师', status: 'archived' },
    ]);

    return { activeTab, homeworks };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F8FAFC] min-h-screen font-sans p-6 space-y-4 animate-fade-in">
    
    <!-- Compact Page Header -->
    <div class="flex justify-between items-center py-1">
        <div class="flex items-center gap-3">
             <div class="p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-primary-600">
                <FileText class="w-5 h-5" />
             </div>
             <div>
                <h2 class="text-lg font-bold text-slate-800 tracking-tight leading-none">作业管理</h2>
                <p class="text-[11px] text-slate-400 font-medium mt-1">管理课程作业与题库资源</p>
             </div>
        </div>
        <div class="flex items-center gap-3">
             <button class="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-2 py-1.5 rounded hover:bg-slate-100">
                <HelpCircle class="w-4 h-4" />
                <span class="hidden sm:inline">使用帮助</span>
            </button>
            <button class="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all hover:-translate-y-0.5">
                <Plus class="w-4 h-4" />
                创建作业
            </button>
        </div>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden relative">
        
        <!-- Modern Tabs Header -->
        <div class="border-b border-slate-200 flex flex-col md:flex-row items-center justify-between px-2 bg-slate-50/50">
            <!-- Tabs -->
             <div class="flex self-stretch">
                <button 
                    @click="activeTab = 'course-homework'"
                    class="group px-6 py-4 flex items-center gap-2.5 text-sm font-bold border-b-2 transition-all relative top-[1px]"
                    :class="activeTab === 'course-homework' ? 'border-primary-600 text-primary-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'"
                >
                    <BookOpen class="w-4 h-4 transition-transform group-hover:scale-110" :class="activeTab === 'course-homework' ? 'text-primary-500' : 'text-slate-400'" />
                    课程作业
                    <span class="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded-full" :class="activeTab === 'course-homework' ? 'bg-primary-50 text-primary-600' : ''">12</span>
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

        <!-- Toolbar -->
        <div class="p-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
             
             <!-- Left: Search & Filter -->
             <div class="flex items-center gap-3 flex-1">
                 <div class="relative group w-full max-w-xs">
                    <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="搜索作业名称或ID..." 
                        class="pl-9 pr-3 py-2 text-sm border border-slate-200 bg-slate-50 rounded-lg w-full focus:outline-none focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500/20 transition-all" 
                    />
                 </div>
                 
                 <div class="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

                 <div class="relative">
                    <button class="px-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                        <Filter class="w-3.5 h-3.5" />
                        状态: 全部
                        <ChevronDown class="w-3 h-3 text-slate-400" />
                    </button>
                 </div>
             </div>

             <!-- Right: View Toggle -->
             <div class="flex items-center gap-2">
                 <button class="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors" title="刷新列表">
                    <RefreshCw class="w-4 h-4" />
                 </button>
             </div>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto custom-scrollbar">
            <table class="w-full text-left border-collapse min-w-[900px]">
                <thead class="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200 w-20">序号</th>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200">作业名称</th>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200 w-32">状态</th>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200 w-48">更新时间</th>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200 w-32">创建人</th>
                        <th class="py-3 px-6 text-xs font-semibold text-slate-500 border-b border-slate-200 w-32 text-right">操作</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr v-for="(item, index) in homeworks" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
                        <td class="py-4 px-6 text-sm text-slate-500 align-middle font-mono">{{ index + 1 }}</td>
                        <td class="py-4 px-6 align-middle">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                                    <FileText class="w-4 h-4" />
                                </div>
                                <div>
                                    <p class="text-sm text-slate-800 font-bold hover:text-primary-600 cursor-pointer transition-colors">{{ item.name }}</p>
                                    <div class="flex items-center gap-2 mt-0.5">
                                        <span 
                                            class="text-[10px] px-1 rounded font-medium border"
                                            :class="item.type === '自定义' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'"
                                        >
                                            {{ item.type }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6 align-middle">
                             <span v-if="item.status === 'published'" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 已发布
                             </span>
                             <span v-else-if="item.status === 'draft'" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                                <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 草稿
                             </span>
                             <span v-else class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> 已归档
                             </span>
                        </td>
                        <td class="py-4 px-6 text-xs text-slate-500 tabular-nums align-middle">
                            <div class="flex items-center gap-1.5">
                                <Clock class="w-3.5 h-3.5 text-slate-400" />
                                {{ item.updatedAt }}
                            </div>
                        </td>
                        <td class="py-4 px-6 text-sm text-slate-600 align-middle">
                            <div class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center">
                                    {{ item.creator.charAt(0) }}
                                </div>
                                {{ item.creator }}
                            </div>
                        </td>
                        <td class="py-4 px-6 text-right align-middle">
                            <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button class="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors" title="编辑">
                                    <Edit class="w-4 h-4" />
                                </button>
                                <button class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                                <button class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
                                    <MoreHorizontal class="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Footer Pagination -->
        <div class="px-6 py-4 border-t border-slate-200 bg-white flex justify-between items-center">
            <span class="text-xs text-slate-500">显示 1 - 5 共 5 条</span>
            <div class="flex gap-2">
                <button class="px-3 py-1.5 text-xs font-medium border border-slate-200 bg-white rounded-md text-slate-400 cursor-not-allowed">上一页</button>
                <button class="px-3 py-1.5 text-xs font-medium border border-slate-200 bg-white rounded-md text-slate-400 cursor-not-allowed">下一页</button>
            </div>
        </div>
    </div>
  </div>
  `
});