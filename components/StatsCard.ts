import { defineComponent } from 'vue';
import { BookOpen, Users, Wallet, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-vue-next';

export default defineComponent({
  name: 'StatsCard',
  components: { BookOpen, Users, Wallet, TrendingUp, TrendingDown, MoreHorizontal },
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    data: { type: Object, required: true },
    trend: { type: String, default: 'neutral' },
    trendValue: { type: String, default: '' },
    colorClass: { type: String, default: 'text-primary-600' }
  },
  template: `
  <div class="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col justify-between border border-slate-100/50">
    
    <div class="flex justify-between items-start mb-4">
      <div class="p-3.5 rounded-2xl bg-slate-50 group-hover:bg-primary-50 transition-colors duration-300">
        <component :is="icon" class="w-6 h-6 transition-colors duration-300" :class="colorClass" />
      </div>
      <button class="text-slate-300 hover:text-slate-600 transition-colors">
        <MoreHorizontal class="w-5 h-5" />
      </button>
    </div>

    <div>
       <p class="text-sm font-medium text-slate-500 mb-1">{{ title }}</p>
       <div class="flex items-baseline gap-1">
          <span v-if="data.unit" class="text-lg font-medium text-slate-600">{{ data.unit }}</span>
          <h3 class="text-3xl font-bold text-slate-800 tracking-tight">{{ data.value }}</h3>
       </div>
    </div>

    <div class="mt-4 flex items-center gap-2 pt-4 border-t border-slate-50">
        <div class="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5"
             :class="trend === 'up' ? 'bg-emerald-50 text-emerald-600' : (trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600')">
            <TrendingUp v-if="trend === 'up'" class="w-3.5 h-3.5" />
            <TrendingDown v-else-if="trend === 'down'" class="w-3.5 h-3.5" />
            <span>{{ trendValue }}</span>
        </div>
        <span class="text-xs text-slate-400 font-medium">{{ data.subLabel }}</span>
    </div>
  </div>
  `
});