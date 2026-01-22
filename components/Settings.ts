import { defineComponent, ref, watch } from 'vue';
import { 
  Save, User, Building, Lock, Bell, Edit, Moon, Sun, Laptop, 
  Globe, Clock, Palette, Type, Check, Shield, Mail, Smartphone,
  Monitor, ChevronRight, ToggleLeft, ToggleRight, Sliders, MonitorPlay,
  Layout, PaintBucket, Globe2, BellRing
} from 'lucide-vue-next';

export default defineComponent({
  name: 'Settings',
  components: { 
    Save, User, Building, Lock, Bell, Edit, Moon, Sun, Laptop,
    Globe, Clock, Palette, Type, Check, Shield, Mail, Smartphone,
    Monitor, ChevronRight, ToggleLeft, ToggleRight, Sliders, MonitorPlay,
    Layout, PaintBucket, Globe2, BellRing
  },
  props: {
    activeTab: { type: String, default: 'profile' },
    currentTheme: { type: String, default: 'system' }
  },
  emits: ['update:theme'],
  setup(props, { emit }) {
    const currentTab = ref(props.activeTab);

    watch(() => props.activeTab, (newVal) => {
        currentTab.value = newVal;
    });

    const selectTheme = (theme: string) => {
        emit('update:theme', theme);
    };

    // --- Preferences State ---
    const accentColor = ref('violet');
    const accentColors = [
        { id: 'violet', bg: 'bg-violet-500', border: 'border-violet-500', ring: 'ring-violet-500', name: '紫罗兰' },
        { id: 'blue', bg: 'bg-blue-500', border: 'border-blue-500', ring: 'ring-blue-500', name: '天空蓝' },
        { id: 'emerald', bg: 'bg-emerald-500', border: 'border-emerald-500', ring: 'ring-emerald-500', name: '翡翠绿' },
        { id: 'rose', bg: 'bg-rose-500', border: 'border-rose-500', ring: 'ring-rose-500', name: '玫瑰红' },
        { id: 'amber', bg: 'bg-amber-500', border: 'border-amber-500', ring: 'ring-amber-500', name: '琥珀金' },
    ];

    const fontSize = ref('normal');

    const notificationSettings = ref({
        email_order: true,
        email_marketing: false,
        sms_security: true,
        sms_promo: false,
        push_comments: true,
        push_mentions: true
    });

    const toggleNotification = (key: keyof typeof notificationSettings.value) => {
        notificationSettings.value[key] = !notificationSettings.value[key];
    };
    
    // --- Advanced Settings State ---
    const historyAccess = ref('allowed'); // 'not-allowed', 'allowed', 'by-course'

    return { 
        currentTab, 
        selectTheme,
        accentColor,
        accentColors,
        fontSize,
        notificationSettings,
        toggleNotification,
        historyAccess
    };
  },
  template: `
  <div class="flex flex-col h-full p-4 space-y-4 max-w-[1600px] mx-auto animate-fade-in">
    
    <!-- Header -->
    <div class="bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-xl p-5 flex items-start justify-between shadow-sm">
        <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                <User class="w-7 h-7" />
            </div>
            <div>
                <div class="flex items-center gap-2 mb-0.5">
                     <h2 class="text-xl font-bold text-neutral-900 dark:text-slate-100 leading-tight">赵峰</h2>
                     <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-50 text-primary-600 border border-primary-100 uppercase tracking-wide">Admin</span>
                </div>
                <p class="text-sm text-neutral-500 dark:text-slate-400">超级管理员 • 霍金课堂</p>
            </div>
        </div>
        <div class="flex gap-3">
            <button class="px-4 py-2 text-[13px] font-medium text-neutral-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-neutral-300 dark:border-slate-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
                查看公开主页
            </button>
            <button class="px-4 py-2 text-[13px] font-bold text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 flex items-center gap-2">
                <Save class="w-4 h-4" />
                保存更改
            </button>
        </div>
    </div>

    <!-- Main Layout -->
    <div class="flex flex-col md:flex-row gap-6 items-start">
        
        <!-- Sidebar Navigation -->
        <div class="w-full md:w-64 bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex-shrink-0 sticky top-4">
            <div class="p-4 border-b border-neutral-200 dark:border-slate-700 bg-neutral-50/50 dark:bg-slate-900/50">
                <h3 class="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider">设置菜单</h3>
            </div>
            <nav class="p-2 space-y-1">
                <button 
                    @click="currentTab = 'profile'"
                    class="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all"
                    :class="currentTab === 'profile' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800'"
                >
                    <div class="flex items-center gap-3">
                        <User class="w-4 h-4" />
                        <span>个人资料</span>
                    </div>
                    <ChevronRight v-if="currentTab === 'profile'" class="w-4 h-4" />
                </button>
                <button 
                    @click="currentTab = 'preferences'"
                    class="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all"
                    :class="currentTab === 'preferences' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800'"
                >
                    <div class="flex items-center gap-3">
                        <Palette class="w-4 h-4" />
                        <span>偏好设置</span>
                    </div>
                    <ChevronRight v-if="currentTab === 'preferences'" class="w-4 h-4" />
                </button>
                <button 
                    @click="currentTab = 'advanced-settings'"
                    class="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all"
                    :class="currentTab === 'advanced-settings' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800'"
                >
                    <div class="flex items-center gap-3">
                        <Sliders class="w-4 h-4" />
                        <span>高级设置</span>
                    </div>
                    <ChevronRight v-if="currentTab === 'advanced-settings'" class="w-4 h-4" />
                </button>
                <button 
                    @click="currentTab = 'security'"
                    class="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all"
                    :class="currentTab === 'security' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800'"
                >
                    <div class="flex items-center gap-3">
                        <Shield class="w-4 h-4" />
                        <span>安全与隐私</span>
                    </div>
                    <ChevronRight v-if="currentTab === 'security'" class="w-4 h-4" />
                </button>
                <button 
                    @click="currentTab = 'institution'"
                    class="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all"
                    :class="currentTab === 'institution' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800'"
                >
                    <div class="flex items-center gap-3">
                        <Building class="w-4 h-4" />
                        <span>机构信息</span>
                    </div>
                    <ChevronRight v-if="currentTab === 'institution'" class="w-4 h-4" />
                </button>
            </nav>
        </div>

        <!-- Content Area -->
        <div class="flex-1 min-w-0 space-y-6">
            
            <!-- Preferences Content -->
            <div v-if="currentTab === 'preferences'" class="space-y-6 animate-fade-in">
                
                <!-- Header for Section -->
                <div>
                    <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">偏好设置</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400">自定义您的工作区外观与交互体验。</p>
                </div>

                <!-- Appearance Card -->
                <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-slate-100 dark:border-slate-700/50">
                        <div class="flex items-center gap-2 mb-4">
                            <Layout class="w-5 h-5 text-primary-500" />
                            <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">界面主题</h3>
                        </div>
                        
                        <!-- Theme Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <!-- Light Theme Option -->
                            <button @click="selectTheme('light')" class="group text-left">
                                <div class="w-full aspect-video rounded-lg border-2 transition-all relative overflow-hidden mb-3"
                                    :class="currentTheme === 'light' ? 'border-primary-500 ring-2 ring-primary-100 dark:ring-primary-900/30' : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-300'">
                                    <!-- Mock UI Light -->
                                    <div class="absolute inset-0 bg-slate-50 flex pointer-events-none">
                                        <div class="w-[25%] h-full bg-white border-r border-slate-200"></div>
                                        <div class="flex-1 flex flex-col">
                                            <div class="h-[18%] bg-white border-b border-slate-200"></div>
                                            <div class="p-3 space-y-2">
                                                <div class="h-2 w-1/3 bg-slate-200 rounded-full"></div>
                                                <div class="h-20 bg-white border border-slate-200 rounded shadow-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Checkmark -->
                                    <div v-if="currentTheme === 'light'" class="absolute bottom-2 right-2 bg-primary-500 text-white rounded-full p-0.5 shadow-sm z-10">
                                        <Check class="w-3 h-3" stroke-width="3" />
                                    </div>
                                </div>
                                <span class="text-sm font-bold text-slate-700 dark:text-slate-300 block">浅色模式</span>
                                <span class="text-xs text-slate-500">清晰明亮，适合日间工作</span>
                            </button>

                            <!-- Dark Theme Option -->
                            <button @click="selectTheme('dark')" class="group text-left">
                                <div class="w-full aspect-video rounded-lg border-2 transition-all relative overflow-hidden mb-3"
                                    :class="currentTheme === 'dark' ? 'border-primary-500 ring-2 ring-primary-100 dark:ring-primary-900/30' : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-300'">
                                    <!-- Mock UI Dark -->
                                    <div class="absolute inset-0 bg-slate-900 flex pointer-events-none">
                                        <div class="w-[25%] h-full bg-slate-800 border-r border-slate-700"></div>
                                        <div class="flex-1 flex flex-col">
                                            <div class="h-[18%] bg-slate-800 border-b border-slate-700"></div>
                                            <div class="p-3 space-y-2">
                                                <div class="h-2 w-1/3 bg-slate-700 rounded-full"></div>
                                                <div class="h-20 bg-slate-800 border border-slate-700 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="currentTheme === 'dark'" class="absolute bottom-2 right-2 bg-primary-500 text-white rounded-full p-0.5 shadow-sm z-10">
                                        <Check class="w-3 h-3" stroke-width="3" />
                                    </div>
                                </div>
                                <span class="text-sm font-bold text-slate-700 dark:text-slate-300 block">深色模式</span>
                                <span class="text-xs text-slate-500">柔和护眼，适合夜间环境</span>
                            </button>

                            <!-- System Theme Option -->
                            <button @click="selectTheme('system')" class="group text-left">
                                <div class="w-full aspect-video rounded-lg border-2 transition-all relative overflow-hidden mb-3"
                                    :class="currentTheme === 'system' ? 'border-primary-500 ring-2 ring-primary-100 dark:ring-primary-900/30' : 'border-slate-200 dark:border-slate-700 group-hover:border-slate-300'">
                                    <!-- Mock UI System (Split) -->
                                    <div class="absolute inset-0 flex pointer-events-none">
                                        <div class="w-1/2 bg-slate-50 border-r border-slate-200 relative overflow-hidden">
                                            <div class="absolute top-3 left-2 right-2 h-2 bg-slate-200 rounded-full"></div>
                                            <div class="absolute top-8 left-2 right-[-20%] h-32 bg-white border border-slate-200 rounded shadow-sm"></div>
                                        </div>
                                        <div class="w-1/2 bg-slate-900 relative overflow-hidden">
                                            <div class="absolute top-3 left-2 right-2 h-2 bg-slate-700 rounded-full"></div>
                                            <div class="absolute top-8 left-[-20%] right-2 h-32 bg-slate-800 border border-slate-700 rounded"></div>
                                        </div>
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-2.5 shadow-lg border border-slate-200 dark:border-slate-600">
                                                <Laptop class="w-5 h-5 text-slate-700 dark:text-slate-200" />
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="currentTheme === 'system'" class="absolute bottom-2 right-2 bg-primary-500 text-white rounded-full p-0.5 shadow-sm z-10">
                                        <Check class="w-3 h-3" stroke-width="3" />
                                    </div>
                                </div>
                                <span class="text-sm font-bold text-slate-700 dark:text-slate-300 block">跟随系统</span>
                                <span class="text-xs text-slate-500">自动同步您的设备设置</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Branding Row -->
                    <div class="p-6 flex flex-col md:flex-row gap-8">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-3">
                                <PaintBucket class="w-4 h-4 text-slate-400" />
                                <label class="text-sm font-bold text-slate-700 dark:text-slate-300">主题色调</label>
                            </div>
                            <div class="flex items-center gap-4">
                                <button 
                                    v-for="color in accentColors" 
                                    :key="color.id"
                                    @click="accentColor = color.id"
                                    class="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none relative"
                                    :class="[color.bg]"
                                    :title="color.name"
                                >
                                    <span v-if="accentColor === color.id" class="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800" :class="color.ring"></span>
                                    <Check v-if="accentColor === color.id" class="w-4 h-4 text-white relative z-10" stroke-width="3" />
                                </button>
                            </div>
                        </div>
                        
                        <div class="w-px bg-slate-100 dark:bg-slate-700 hidden md:block"></div>

                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-3">
                                <Type class="w-4 h-4 text-slate-400" />
                                <label class="text-sm font-bold text-slate-700 dark:text-slate-300">文字密度</label>
                            </div>
                            <div class="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg w-full max-w-xs">
                                <button 
                                    v-for="size in ['small', 'normal', 'large']"
                                    :key="size"
                                    @click="fontSize = size"
                                    class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize"
                                    :class="fontSize === size ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
                                >
                                    {{ size === 'small' ? '紧凑' : (size === 'normal' ? '标准' : '宽松') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- General Settings -->
                <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-2">
                        <Globe2 class="w-5 h-5 text-primary-500" />
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">区域与语言</h3>
                    </div>
                    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Language -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-slate-700 dark:text-slate-300">系统语言</label>
                            <div class="relative">
                                <select class="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all hover:border-slate-300">
                                    <option value="zh-CN" selected>简体中文 (zh-CN)</option>
                                    <option value="en-US">English (US)</option>
                                    <option value="zh-HK">繁体中文 (zh-HK)</option>
                                </select>
                                <ChevronRight class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                            </div>
                        </div>
                        <!-- Timezone -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-slate-700 dark:text-slate-300">时区</label>
                            <div class="relative">
                                <select class="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all hover:border-slate-300">
                                    <option value="UTC+8" selected>中国标准时间 (UTC+08:00)</option>
                                    <option value="UTC+0">协调世界时 (UTC+00:00)</option>
                                </select>
                                <ChevronRight class="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Notifications -->
                <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                    <div class="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-2">
                        <BellRing class="w-5 h-5 text-primary-500" />
                        <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">消息通知</h3>
                    </div>
                    <div class="divide-y divide-slate-100 dark:divide-slate-700">
                        <!-- Email Item -->
                        <div class="p-6 flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div class="flex gap-4">
                                <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                    <Mail class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">邮件通知</h4>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md">接收关于订单状态、营销活动报告以及系统安全警报的邮件。</p>
                                    <div class="mt-3 flex gap-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                                            <Check class="w-3 h-3 text-emerald-500" /> zhaofeng@hawking.edu
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3 items-end">
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors">订单提醒</span>
                                    <div @click="toggleNotification('email_order')" class="relative w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full transition-colors cursor-pointer" :class="{'bg-primary-500': notificationSettings.email_order}">
                                        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm" :class="{'translate-x-5': notificationSettings.email_order}"></div>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors">营销周报</span>
                                    <div @click="toggleNotification('email_marketing')" class="relative w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full transition-colors cursor-pointer" :class="{'bg-primary-500': notificationSettings.email_marketing}">
                                        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm" :class="{'translate-x-5': notificationSettings.email_marketing}"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- SMS Item -->
                        <div class="p-6 flex items-start justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div class="flex gap-4">
                                <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                    <Smartphone class="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">短信通知</h4>
                                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md">接收重要账户安全验证码及紧急系统通知。</p>
                                    <div class="mt-3 flex gap-3">
                                        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                                            <Check class="w-3 h-3 text-emerald-500" /> 138****8888
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3 items-end">
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <span class="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors">安全验证</span>
                                    <div @click="toggleNotification('sms_security')" class="relative w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full transition-colors cursor-pointer" :class="{'bg-primary-500': notificationSettings.sms_security}">
                                        <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm" :class="{'translate-x-5': notificationSettings.sms_security}"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Advanced Settings Content -->
            <div v-if="currentTab === 'advanced-settings'" class="space-y-6 animate-fade-in">
                <!-- Classroom Settings Card -->
                <div class="bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
                    <div class="px-6 py-4 border-b border-neutral-200 dark:border-slate-700 bg-neutral-50/50 dark:bg-slate-900/50 flex items-center gap-2">
                        <MonitorPlay class="w-4 h-4 text-primary-500" />
                        <h3 class="text-sm font-bold text-neutral-800 dark:text-slate-200">课堂设置</h3>
                    </div>
                    
                    <div class="p-6">
                        <!-- Setting Item -->
                        <div class="flex flex-col gap-6">
                            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div>
                                    <h4 class="text-sm font-bold text-neutral-800 dark:text-slate-200">允许后进班学生查看之前的历史课堂</h4>
                                    <p class="text-xs text-neutral-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                                        设置后，在设置状态后进入课程的会生效。此功能有助于新学员快速追赶学习进度，但可能影响部分时效性内容的教学安排。
                                    </p>
                                </div>
                                
                                <!-- Selection Controls -->
                                <div class="flex flex-wrap items-center gap-3">
                                    <label 
                                        class="flex items-center gap-2 cursor-pointer group px-3 py-2 rounded-lg border transition-all"
                                        :class="historyAccess === 'not-allowed' 
                                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' 
                                            : 'bg-white dark:bg-slate-800 border-neutral-200 dark:border-slate-600 hover:border-neutral-300 dark:hover:border-slate-500'"
                                    >
                                        <div class="relative flex items-center justify-center w-4 h-4 rounded-full border transition-colors"
                                             :class="historyAccess === 'not-allowed' ? 'border-primary-600' : 'border-neutral-400 group-hover:border-neutral-500'"
                                        >
                                            <div class="w-2 h-2 rounded-full bg-primary-600 transition-transform duration-200"
                                                 :class="historyAccess === 'not-allowed' ? 'scale-100' : 'scale-0'"
                                            ></div>
                                        </div>
                                        <input type="radio" value="not-allowed" v-model="historyAccess" class="hidden" />
                                        <span class="text-sm font-medium" :class="historyAccess === 'not-allowed' ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-600 dark:text-slate-300'">不允许</span>
                                    </label>

                                    <label 
                                        class="flex items-center gap-2 cursor-pointer group px-3 py-2 rounded-lg border transition-all"
                                        :class="historyAccess === 'allowed' 
                                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' 
                                            : 'bg-white dark:bg-slate-800 border-neutral-200 dark:border-slate-600 hover:border-neutral-300 dark:hover:border-slate-500'"
                                    >
                                        <div class="relative flex items-center justify-center w-4 h-4 rounded-full border transition-colors"
                                             :class="historyAccess === 'allowed' ? 'border-primary-600' : 'border-neutral-400 group-hover:border-neutral-500'"
                                        >
                                            <div class="w-2 h-2 rounded-full bg-primary-600 transition-transform duration-200"
                                                 :class="historyAccess === 'allowed' ? 'scale-100' : 'scale-0'"
                                            ></div>
                                        </div>
                                        <input type="radio" value="allowed" v-model="historyAccess" class="hidden" />
                                        <span class="text-sm font-medium" :class="historyAccess === 'allowed' ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-600 dark:text-slate-300'">允许</span>
                                    </label>

                                    <label 
                                        class="flex items-center gap-2 cursor-pointer group px-3 py-2 rounded-lg border transition-all"
                                        :class="historyAccess === 'by-course' 
                                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' 
                                            : 'bg-white dark:bg-slate-800 border-neutral-200 dark:border-slate-600 hover:border-neutral-300 dark:hover:border-slate-500'"
                                    >
                                        <div class="relative flex items-center justify-center w-4 h-4 rounded-full border transition-colors"
                                             :class="historyAccess === 'by-course' ? 'border-primary-600' : 'border-neutral-400 group-hover:border-neutral-500'"
                                        >
                                            <div class="w-2 h-2 rounded-full bg-primary-600 transition-transform duration-200"
                                                 :class="historyAccess === 'by-course' ? 'scale-100' : 'scale-0'"
                                            ></div>
                                        </div>
                                        <input type="radio" value="by-course" v-model="historyAccess" class="hidden" />
                                        <span class="text-sm font-medium" :class="historyAccess === 'by-course' ? 'text-primary-700 dark:text-primary-300' : 'text-neutral-600 dark:text-slate-300'">按课程设置</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Profile Tab Placeholder (Enhanced) -->
            <div v-if="currentTab === 'profile'" class="bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-xl shadow-sm p-8 animate-fade-in">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
                    <div class="col-span-2 pb-2 border-b border-neutral-200 dark:border-slate-700 mb-2">
                        <h3 class="text-sm font-bold text-neutral-900 dark:text-slate-100">基本信息</h3>
                    </div>
                    
                    <div class="border-b border-neutral-100 dark:border-slate-700 pb-2">
                        <span class="block text-[11px] font-medium text-neutral-500 dark:text-slate-400 mb-1">姓名</span>
                        <div class="text-sm text-neutral-900 dark:text-slate-200 flex justify-between items-center group cursor-pointer p-2 -ml-2 rounded hover:bg-neutral-50 dark:hover:bg-slate-700/50 transition-colors">
                            赵峰
                            <Edit class="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>

                    <div class="border-b border-neutral-100 dark:border-slate-700 pb-2">
                        <span class="block text-[11px] font-medium text-neutral-500 dark:text-slate-400 mb-1">职位</span>
                        <div class="text-sm text-neutral-900 dark:text-slate-200 flex justify-between items-center group cursor-pointer p-2 -ml-2 rounded hover:bg-neutral-50 dark:hover:bg-slate-700/50 transition-colors">
                            创始人 & CEO
                            <Edit class="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>

                    <div class="border-b border-neutral-100 dark:border-slate-700 pb-2">
                        <span class="block text-[11px] font-medium text-neutral-500 dark:text-slate-400 mb-1">电子邮件</span>
                        <div class="text-sm text-primary-600 font-medium flex justify-between items-center group cursor-pointer p-2 -ml-2 rounded hover:bg-neutral-50 dark:hover:bg-slate-700/50 transition-colors">
                            zhaofeng@hawking.edu
                            <Edit class="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other Tabs Placeholders -->
             <div v-if="['security', 'institution'].includes(currentTab)" class="bg-white dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center animate-fade-in h-[400px]">
                <div class="w-16 h-16 bg-neutral-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <Shield v-if="currentTab === 'security'" class="w-8 h-8 text-neutral-400" />
                    <Building v-else class="w-8 h-8 text-neutral-400" />
                </div>
                <h3 class="text-lg font-bold text-neutral-800 dark:text-slate-200 mb-2">功能建设中</h3>
                <p class="text-sm text-neutral-500 dark:text-slate-400 max-w-xs">
                    {{ currentTab === 'security' ? '安全与隐私' : '机构信息' }} 设置页面正在开发升级中，敬请期待。
                </p>
             </div>

        </div>
    </div>
  </div>
  `
});