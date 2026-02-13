import { defineComponent, ref } from 'vue';
import { 
  Search, HelpCircle, FileText, Filter, RefreshCw, 
  BookOpen, Layers, MoreHorizontal, Eye, Plus, Info
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Homework',
  components: { 
    Search, HelpCircle, FileText, Filter, RefreshCw, 
    BookOpen, Layers, MoreHorizontal, Eye, Plus, Info
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
      }
    ]);

    return { activeTab, courseList };
  },
  template: `
  <div class="flex flex-col h-full bg-[#F8FAFC] min-h-screen font-sans p-6 space-y-4 animate-fade-in">
    
    <!-- Info Banner (Replaces redundant header) -->
    <div class="flex justify-between items-start md:items-center px-1">
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
        <div class="border-b border-slate-200 flex flex-col md:flex-row items-center justify-between px-2 bg-slate-50/50">
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
        <div class="p-5 border-b border-slate-100 bg-white">
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
                        <!-- Custom Arrow -->
                        <svg class="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
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
                    <tr v-for="(item, index) in courseList" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
                        <td class="py-5 px-6 text-sm text-slate-500 align-middle font-mono">{{ index + 1 }}</td>
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
        
    </div>
  </div>
  `
});