import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import Sidebar from './components/Sidebar.ts';
import Header from './components/Header.ts';
import QuickFunctions from './components/QuickFunctions.ts';
import HelpCenter from './components/HelpCenter.ts';
import RightPanel from './components/RightPanel.ts';
import CourseManagement from './components/CourseManagement.ts'; 
import Homework from './components/Homework.ts';
import Finance from './components/Finance.ts';
import Marketing from './components/Marketing.ts';
import Settings from './components/Settings.ts';
import Stats from './components/Stats.ts';
import { Megaphone, X, Trophy, Sparkles, AlertCircle, Info, BookOpen, Users, Wallet } from 'lucide-vue-next';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Header,
    QuickFunctions,
    HelpCenter,
    RightPanel,
    CourseManagement,
    Homework,
    Finance,
    Marketing,
    Settings,
    Stats,
    Megaphone,
    X,
    Trophy,
    Sparkles,
    AlertCircle,
    Info,
    BookOpen,
    Users,
    Wallet
  },
  setup() {
    const currentView = ref('finance'); // Default to finance as per latest user request context

    const handleNavigate = (viewId) => {
        currentView.value = viewId;
    };

    const breadcrumbMap = {
      'dashboard': ['概览'],
      
      // Teaching
      'course-management': ['教学管理', '课程管理'],
      'homework': ['教学管理', '作业管理'],
      'small-class': ['教学管理', '小班课管理'],
      
      // Basic Info
      'basic-info': ['基本资料', '基本信息'],
      'qualifications': ['基本资料', '办学资质'],

      // Finance
      'finance': ['财务管理', '交易管理'],
      'refunds': ['财务管理', '退款管理'],
      'settlement': ['财务管理', '结算记录'],

      // Edu Affairs
      'edu-affairs': ['教务管理', '学员管理'],
      'class-scheduling': ['教务管理', '排课管理'],

      // Marketing
      'marketing': ['营销工具', '营销中心'],
      'coupons': ['营销工具', '优惠券'],

      // Institution
      'institution': ['机构管理', '机构信息'],
      'staff': ['机构管理', '员工管理'],

      // Stats
      'stats': ['数据统计', '数据概览'],
      'traffic-analysis': ['数据统计', '流量分析'],

      // Settings
      'settings': ['设置'],
      'profile': ['设置', '个人资料'],
      'preferences': ['设置', '偏好设置'],
      'advanced-settings': ['设置', '高级设置'],
    };

    const currentBreadcrumbs = computed(() => breadcrumbMap[currentView.value] || ['未知页面']);

    // --- Theme Management ---
    const theme = ref(localStorage.getItem('theme') || 'system');

    const applyTheme = () => {
       const root = document.documentElement;
       const isDark = theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
       
       if (isDark) {
           root.classList.add('dark');
       } else {
           root.classList.remove('dark');
       }
       localStorage.setItem('theme', theme.value);
    };

    // Initialize and watch for changes
    onMounted(() => {
        applyTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (theme.value === 'system') applyTheme();
        });
    });

    watch(theme, applyTheme);

    const updateTheme = (newTheme) => {
        theme.value = newTheme;
    };

    return { currentView, handleNavigate, currentBreadcrumbs, theme, updateTheme };
  },
  template: `
  <div class="flex h-screen bg-[#F8FAFC] dark:bg-slate-900 dark:text-slate-100 font-sans text-slate-600 overflow-hidden selection:bg-primary-100 selection:text-primary-700">
    <!-- Sidebar -->
    <Sidebar :currentView="currentView" @navigate="handleNavigate" class="flex-shrink-0" />

    <div class="flex flex-col flex-1 min-w-0">
      <!-- Header -->
      <Header class="flex-shrink-0" :breadcrumbs="currentBreadcrumbs" />
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        
        <!-- Dashboard View -->
        <div v-if="currentView === 'dashboard'" class="max-w-[1600px] mx-auto p-8 space-y-6 animate-fade-in">
          
          <!-- Alert Banner -->
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
             <AlertCircle class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
             <p class="text-sm text-red-700 dark:text-red-400 leading-snug">
                订单完成后，进行订单金额提现，平台将从订单金额中按 5% 的比例收取平台服务费。
             </p>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
             <!-- Center Column (Main Content) -->
             <div class="xl:col-span-9 space-y-6">
                
                <!-- Stats Cards Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Card 1: Courses -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100/50 dark:border-slate-700 relative overflow-hidden group">
                        <div class="flex justify-between items-start z-10 relative">
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                                        <BookOpen class="w-5 h-5" />
                                    </div>
                                    <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">课程数量</span>
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">13</h3>
                                    <div class="flex items-center gap-2 mt-2">
                                         <span class="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                                            今日直播 <span class="text-violet-600 dark:text-violet-400 font-bold ml-1">0</span>
                                         </span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Radial Progress -->
                            <div class="relative w-20 h-20 flex items-center justify-center">
                                 <svg viewBox="0 0 80 80" class="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" class="text-slate-100 dark:text-slate-700" />
                                    <!-- Circumference = 2 * PI * 32 ≈ 201 -->
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" stroke-dasharray="201" :stroke-dashoffset="201 - (201 * 0.45)" class="text-violet-500" stroke-linecap="round" />
                                 </svg>
                                 <span class="absolute text-xs font-bold text-violet-600 dark:text-violet-400">45%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Students -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100/50 dark:border-slate-700 relative overflow-hidden group">
                        <div class="flex justify-between items-start z-10 relative">
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                                        <Users class="w-5 h-5" />
                                    </div>
                                    <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">学员数量</span>
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">18</h3>
                                    <div class="flex items-center gap-2 mt-2">
                                         <span class="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                                            昨日新增 <span class="text-sky-600 dark:text-sky-400 font-bold ml-1">0</span>
                                         </span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Radial Progress -->
                            <div class="relative w-20 h-20 flex items-center justify-center">
                                 <svg viewBox="0 0 80 80" class="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" class="text-slate-100 dark:text-slate-700" />
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" stroke-dasharray="201" :stroke-dashoffset="201 - (201 * 0.12)" class="text-sky-500" stroke-linecap="round" />
                                 </svg>
                                 <span class="absolute text-xs font-bold text-sky-500">12%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3: Revenue -->
                    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100/50 dark:border-slate-700 relative overflow-hidden group">
                        <div class="flex justify-between items-start z-10 relative">
                            <div class="flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                     <div class="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                        <Wallet class="w-5 h-5" />
                                    </div>
                                    <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">收款金额</span>
                                </div>
                                <div>
                                    <h3 class="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">¥2.91</h3>
                                    <div class="flex items-center gap-2 mt-2">
                                         <span class="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                                            昨日收款 <span class="text-amber-600 dark:text-amber-400 font-bold ml-1">¥0.00</span>
                                         </span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Radial Progress -->
                            <div class="relative w-20 h-20 flex items-center justify-center">
                                 <svg viewBox="0 0 80 80" class="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" class="text-slate-100 dark:text-slate-700" />
                                    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="6" fill="transparent" stroke-dasharray="201" :stroke-dashoffset="201 - (201 * 0.02)" class="text-amber-500" stroke-linecap="round" />
                                 </svg>
                                 <span class="absolute text-xs font-bold text-amber-500">2%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <QuickFunctions />
                
                <HelpCenter />
             </div>

             <!-- Right Column (Right Sidebar) -->
             <div class="xl:col-span-3 space-y-6">
                <RightPanel />
             </div>
          </div>
        </div>

        <!-- Other Views -->
        <div v-else-if="currentView === 'course-management'" class="h-full">
            <CourseManagement />
        </div>
        <div v-else-if="currentView === 'homework'" class="h-full">
            <Homework />
        </div>
        <div v-else-if="currentView === 'finance'" class="h-full">
            <Finance />
        </div>
        <div v-else-if="currentView === 'marketing'" class="h-full">
            <Marketing />
        </div>
        <div v-else-if="currentView === 'stats'" class="h-full">
            <Stats />
        </div>
        <div v-else-if="['settings', 'profile', 'institution', 'preferences', 'advanced-settings'].includes(currentView)" class="h-full">
            <Settings 
                :activeTab="currentView === 'settings' ? 'profile' : currentView" 
                :currentTheme="theme"
                @update:theme="updateTheme"
            />
        </div>
        
        <!-- Fallback for in-development pages -->
        <div v-else class="flex flex-col items-center justify-center h-full text-slate-400">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-card mb-4">
                <Sparkles class="w-10 h-10 text-primary-300" />
            </div>
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">功能开发中</h2>
            <p class="text-sm mt-1">页面 "{{ currentBreadcrumbs.join(' / ') }}" 正在建设中。</p>
        </div>

      </main>
    </div>
  </div>
  `
});