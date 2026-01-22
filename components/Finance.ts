import { defineComponent } from 'vue';
import { Wallet, ArrowUpRight, ArrowDownLeft, Download, Calendar, BarChart3, Filter } from 'lucide-vue-next';

export default defineComponent({
  name: 'Finance',
  components: { Wallet, ArrowUpRight, ArrowDownLeft, Download, Calendar, BarChart3, Filter },
  setup() {
    const transactions = [
      { id: 'TRX-9821', date: '2023-10-24', type: '课程收入', desc: 'Python 基础入门 - 订单 #8823', amount: '+100.00', status: 'success' },
      { id: 'TRX-9820', date: '2023-10-23', type: '提现', desc: '提现至支付宝 (尾号 8829)', amount: '-2,500.00', status: 'processing' },
      { id: 'TRX-9819', date: '2023-10-23', type: '课程收入', desc: '插画艺术 - 订单 #8821', amount: '+299.00', status: 'success' },
      { id: 'TRX-9818', date: '2023-10-22', type: '课程收入', desc: 'React 进阶 - 订单 #8819', amount: '+599.00', status: 'success' },
    ];
    return { transactions };
  },
  template: `
  <div class="flex flex-col h-full p-4 space-y-4 max-w-[1400px] mx-auto">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center bg-white p-4 border border-neutral-300 rounded shadow-sm">
        <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-[#2E844A] rounded-[4px] flex items-center justify-center text-white">
                <BarChart3 class="w-6 h-6" />
             </div>
             <div>
                <h1 class="text-[13px] text-neutral-600 mb-0.5">仪表盘</h1>
                <h2 class="text-[20px] font-bold text-neutral-900 leading-none">财务概览</h2>
             </div>
        </div>
        <div class="flex gap-2">
             <button class="px-3 py-1.5 text-[13px] font-medium text-neutral-600 bg-white border border-neutral-300 rounded-[4px] hover:bg-neutral-50">刷新</button>
             <button class="px-3 py-1.5 text-[13px] font-medium text-white bg-brand-500 border border-brand-500 rounded-[4px] hover:bg-brand-600">申请提现</button>
        </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Metric 1 -->
        <div class="bg-white border border-neutral-300 rounded p-4 shadow-sm relative overflow-hidden group">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[13px] text-neutral-600 font-medium">可提现金额</span>
                <Wallet class="w-4 h-4 text-neutral-400" />
            </div>
            <div class="text-[28px] font-light text-neutral-900">¥ 12,450.00</div>
            <div class="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-2 text-[12px]">
                <span class="text-neutral-500">待结算: ¥ 580.00</span>
            </div>
            <div class="absolute top-0 left-0 bottom-0 w-1 bg-brand-500"></div>
        </div>

        <!-- Metric 2 -->
        <div class="bg-white border border-neutral-300 rounded p-4 shadow-sm relative overflow-hidden group">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[13px] text-neutral-600 font-medium">本月收入</span>
                <span class="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px] font-bold">+12%</span>
            </div>
            <div class="text-[28px] font-light text-neutral-900">¥ 4,290.00</div>
             <div class="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-2 text-[12px]">
                <span class="text-neutral-500">较上月 +¥ 450.00</span>
            </div>
            <div class="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500"></div>
        </div>

        <!-- Metric 3 -->
        <div class="bg-white border border-neutral-300 rounded p-4 shadow-sm relative overflow-hidden group">
            <div class="flex justify-between items-start mb-2">
                <span class="text-[13px] text-neutral-600 font-medium">本月支出</span>
                <span class="text-neutral-400 text-[11px]">3 笔处理中</span>
            </div>
            <div class="text-[28px] font-light text-neutral-900">¥ 2,550.00</div>
             <div class="mt-2 pt-2 border-t border-neutral-100 flex items-center gap-2 text-[12px]">
                <span class="text-neutral-500">主要为提现支出</span>
            </div>
             <div class="absolute top-0 left-0 bottom-0 w-1 bg-orange-400"></div>
        </div>
    </div>

    <!-- Report Table -->
    <div class="bg-white border border-neutral-300 rounded shadow-sm flex-1 flex flex-col min-h-[400px]">
        <div class="px-4 py-3 border-b border-neutral-200 bg-[#F3F5F7] flex justify-between items-center rounded-t">
            <h3 class="text-[13px] font-bold text-neutral-800">最近交易 (30天)</h3>
            <div class="flex items-center gap-2">
                <button class="p-1 text-neutral-500 hover:text-brand-500"><Filter class="w-3.5 h-3.5" /></button>
                <button class="p-1 text-neutral-500 hover:text-brand-500"><Download class="w-3.5 h-3.5" /></button>
            </div>
        </div>
        <div class="overflow-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-white border-b border-neutral-200">
                    <tr>
                        <th class="px-4 py-2 text-[11px] font-bold text-neutral-600 uppercase tracking-wider">日期</th>
                        <th class="px-4 py-2 text-[11px] font-bold text-neutral-600 uppercase tracking-wider">类型</th>
                        <th class="px-4 py-2 text-[11px] font-bold text-neutral-600 uppercase tracking-wider">描述</th>
                        <th class="px-4 py-2 text-[11px] font-bold text-neutral-600 uppercase tracking-wider text-right">金额</th>
                        <th class="px-4 py-2 text-[11px] font-bold text-neutral-600 uppercase tracking-wider">状态</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-neutral-100">
                    <tr v-for="t in transactions" :key="t.id" class="hover:bg-neutral-50 transition-colors">
                        <td class="px-4 py-2.5 text-[13px] text-neutral-800">{{ t.date }}</td>
                        <td class="px-4 py-2.5 text-[13px] text-neutral-800">{{ t.type }}</td>
                        <td class="px-4 py-2.5 text-[13px] text-brand-500 hover:underline cursor-pointer">{{ t.desc }}</td>
                        <td class="px-4 py-2.5 text-[13px] font-medium text-right" :class="t.amount.startsWith('+') ? 'text-emerald-700' : 'text-neutral-900'">
                            {{ t.amount }}
                        </td>
                        <td class="px-4 py-2.5">
                            <span v-if="t.status === 'success'" class="text-[11px] text-emerald-700 font-medium">● 成功</span>
                            <span v-else class="text-[11px] text-amber-600 font-medium">● 处理中</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
  `
});