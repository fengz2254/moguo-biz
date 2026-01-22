import { defineComponent } from 'vue';
import { BarChart3, TrendingUp, Filter, Download, PieChart, LineChart } from 'lucide-vue-next';

export default defineComponent({
  name: 'Stats',
  components: { BarChart3, TrendingUp, Filter, Download, PieChart, LineChart },
  setup() {
    return {};
  },
  template: `
  <div class="flex flex-col h-full p-4 space-y-4 max-w-[1400px] mx-auto">
    <!-- Header -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-card">
        <div class="flex items-center gap-4">
             <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <PieChart class="w-6 h-6" />
             </div>
             <div>
                <h1 class="text-sm font-medium text-slate-500 mb-0.5">仪表盘</h1>
                <h2 class="text-2xl font-bold text-slate-800 leading-none">业务分析 2024</h2>
             </div>
        </div>
        <div class="flex gap-2 text-xs font-medium text-slate-500">
            <span>最后刷新: 刚刚</span>
            <span class="border-l border-slate-300 mx-2 h-4"></span>
            <button class="text-primary-600 hover:underline">订阅报表</button>
        </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Chart 1 (Bar Chart) -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-card flex flex-col h-96 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 class="text-sm font-bold text-slate-800">每周流量趋势</h3>
                <button class="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-primary-500"><Download class="w-4 h-4" /></button>
            </div>
            <div class="flex-1 p-8 flex items-end justify-between gap-6">
                <!-- Bars with Purple Gradient -->
                <div class="w-full bg-primary-200 h-[40%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer">
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">400</div>
                </div>
                <div class="w-full bg-primary-200 h-[65%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer">
                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">650</div>
                </div>
                <div class="w-full bg-primary-200 h-[50%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer"></div>
                <div class="w-full bg-primary-200 h-[80%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer"></div>
                <div class="w-full bg-gradient-to-t from-primary-600 to-primary-400 h-[95%] rounded-t-lg shadow-lg shadow-primary-500/30 relative group cursor-pointer">
                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded">Today</div>
                </div>
                <div class="w-full bg-primary-200 h-[60%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer"></div>
                <div class="w-full bg-primary-200 h-[45%] rounded-t-lg relative group hover:bg-primary-500 transition-colors duration-300 cursor-pointer"></div>
            </div>
            <div class="px-8 pb-6 flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>

        <!-- Chart 2 (Donut Chart) -->
        <div class="bg-white border border-slate-200 rounded-2xl shadow-card flex flex-col h-96 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 class="text-sm font-bold text-slate-800">学员活跃度分布</h3>
                <button class="text-xs text-primary-600 font-medium hover:underline">查看详情</button>
            </div>
            <div class="flex-1 flex items-center justify-center relative">
                <!-- CSS Donut -->
                <div class="relative w-56 h-56 rounded-full border-[24px] border-slate-50 border-t-primary-500 border-r-primary-300 border-l-primary-500 rotate-45 hover:scale-105 transition-transform duration-500 shadow-xl shadow-primary-500/10"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p class="text-4xl font-bold text-slate-800 tracking-tight">86%</p>
                    <p class="text-sm font-medium text-slate-400 uppercase tracking-wide mt-1">总活跃度</p>
                </div>
            </div>
            <div class="px-6 py-4 border-t border-slate-100 flex justify-center gap-8 bg-slate-50/30">
                <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span class="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-sm"></span> 高频学员
                </div>
                <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span class="w-2.5 h-2.5 rounded-full bg-primary-300 shadow-sm"></span> 中频学员
                </div>
                 <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span> 低频/沉睡
                </div>
            </div>
        </div>

        <!-- Data Table (Report) -->
        <div class="col-span-1 lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
             <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 class="text-sm font-bold text-slate-800">关键指标概览</h3>
            </div>
            <div class="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="flex flex-col gap-1">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">总访问量</p>
                    <p class="text-3xl font-bold text-slate-800">12,594</p>
                    <span class="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit">+12% vs 上周</span>
                </div>
                <div class="flex flex-col gap-1 relative md:border-l md:border-slate-100 md:pl-8">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">转化率</p>
                    <p class="text-3xl font-bold text-slate-800">3.2%</p>
                    <span class="text-xs font-medium text-slate-500">行业平均 2.8%</span>
                </div>
                <div class="flex flex-col gap-1 relative md:border-l md:border-slate-100 md:pl-8">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">新增学员</p>
                    <p class="text-3xl font-bold text-slate-800">128</p>
                    <span class="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded w-fit">今日 +5</span>
                </div>
                <div class="flex flex-col gap-1 relative md:border-l md:border-slate-100 md:pl-8">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">平均学习时长</p>
                    <p class="text-3xl font-bold text-slate-800">45m</p>
                    <span class="text-xs font-medium text-emerald-600">↑ 提升显著</span>
                </div>
            </div>
        </div>

    </div>
  </div>
  `
});