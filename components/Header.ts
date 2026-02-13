import { defineComponent } from 'vue';
import { Bell, Search, Store, Video } from 'lucide-vue-next';

export default defineComponent({
  name: 'Header',
  components: { Bell, Search, Store, Video },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => ['概览']
    }
  },
  setup(props) {
    const formatDate = () => {
        const d = new Date();
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    };
    return { formatDate };
  },
  template: `
  <header class="h-[64px] bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0 transition-all duration-200">
    
    <!-- Title / Breadcrumb (Left) - Redesigned as Single Line -->
    <div class="flex items-center gap-3 select-none">
       <template v-for="(item, index) in breadcrumbs" :key="index">
          <!-- Separator -->
          <span v-if="index > 0" class="text-slate-300 dark:text-slate-600 text-lg font-light">/</span>
          
          <!-- Breadcrumb Item -->
          <span 
            :class="[
              index === breadcrumbs.length - 1 
                ? 'text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight' 
                : 'text-base font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default'
            ]"
          >
            {{ item }}
          </span>
       </template>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-3">
        
        <!-- Institution Home Button -->
        <button class="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-200 rounded-xl shadow-sm transition-all group">
            <Store class="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
            <span>机构主页</span>
        </button>

        <!-- Start Class Button (Primary) -->
        <button class="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2">
            <Video class="w-4 h-4" />
            <span>开始上课</span>
        </button>

        <div class="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>

        <!-- Notification -->
        <button class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-soft hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-md transition-all relative">
            <Bell class="w-5 h-5" />
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>

        <!-- User Profile (Minimal) -->
        <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-xs cursor-pointer hover:ring-2 hover:ring-primary-500/30 transition-all">
            赵峰
        </div>
    </div>
  </header>
  `
});