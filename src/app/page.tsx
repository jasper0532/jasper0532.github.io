'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Phone, 
  MapPin, 
  ChevronRight,
  Clock,
  ArrowRight,
  X,
  Briefcase,
  Users,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle
} from 'lucide-react';

// 韩国岗位数据
const koreaJobs = [
  {
    id: 'korea-1',
    title: '韩国仁川厨师',
    location: '仁川',
    type: '厨师/帮厨',
    salary: '240-300万韩元/月',
    highlights: [
      '厨师月薪: 240-300万韩元',
      '帮厨月薪: 240万韩元以上',
      '食宿由雇主免费提供',
      '韩国4大保险费用由韩方雇主及劳务人员各承担50%',
      '享有退职金，相当每年开13个月工资',
      '每满12个月可以享受退职金'
    ],
    requirements: [
      '中级及以上厨师证（必须能在人社部OSTA网站查询）',
      '性别：不限，民族：不限',
      '男（厨师、拉面师、面点师）21-45周岁',
      '女面点师21-40周岁（长相气质好的可放宽到45周岁）',
      '身体健康，无前科劣迹',
      '本人或直系亲属无韩国拒签史',
      '无在韩国非法滞留及遣返史者'
    ]
  },
  {
    id: 'korea-2',
    title: '韩国免税店销售',
    location: '免税店',
    type: '销售/服务员',
    salary: '3年40-50万人民币',
    highlights: [
      '海苔类、辣白菜等产品的销售',
      '整理货品、迎接客人',
      '合同期3年，合同期满可续签',
      '包住包工餐',
      '出境快、带薪休假、13薪',
      '工作满一年有退职金（三年期满回国约3万元人民币）'
    ],
    requirements: [
      '男性，21-35周岁',
      '中专及以上学历',
      '有销售经验者优先录取',
      '身体健康',
      '无赴韩不良务工记录和拒签史',
      '签证类型：E-7工作签'
    ]
  },
  {
    id: 'korea-3',
    title: '济州岛餐饮服务员',
    location: '济州岛',
    type: '餐厅服务员',
    salary: '220-230万韩币/月',
    highlights: [
      '月薪220万~230万韩币起（约合人民币1.1～1.2万）',
      '平均每天在岗时间12小时（包括吃饭及休息时间）',
      '月休4天',
      '正规工作就业签证',
      '合同期限：3+N（表现好可一直续签）',
      '包吃包住，退职金（十三薪）',
      '年假+节日福利，保险（在国外有保障）'
    ],
    requirements: [
      '女生22-43岁，男生22-39岁',
      '有餐饮/酒店经验优先',
      '身体健康，无不良记录'
    ]
  }
];

// 澳大利亚岗位数据
const australiaJobs = [
  {
    id: 'australia-1',
    title: '澳大利亚普工',
    location: '全澳',
    type: '多种工种',
    salary: '6.5-9万澳币/年',
    highlights: [
      '年薪6.5万—9万澳币（32万—44万人民币/年）',
      '工作约40个小时/周',
      '合同年限4年（482签证时长4年）',
      '配偶可以一起办理签证，签证无工作限制',
      '未满18周岁子女可免费入学',
      '11%养老金+2周带薪病假+4周带薪年假'
    ],
    requirements: [
      '男女不限，42周岁以内',
      '中专以及高中以上学历',
      '雅思4.5-5分',
      '签证类型：澳大利亚482/494签证'
    ],
    jobTypes: [
      '护士', '餐厅经理', '行政主厨', '厨师', '理发师', 
      '按摩师', '石匠', '橱柜工', '铆工', '焊工',
      '塑料焊工', '卡车司机', '土方工程操作员', '猪场饲养员',
      '零售肉贩', '舞蹈老师'
    ]
  }
];

// 美国岗位数据
const usJobs = [
  {
    id: 'us-1',
    title: '美国J1研究学者项目',
    location: '美国',
    type: '研究学者/研究员',
    salary: '初级5-9万美元/年，中级8-20万美元/年，高级15-30万美元/年',
    highlights: [
      'J1签证自带工作许可，无需申请工卡',
      '可在美企业、高校、研究机构工作1-5年',
      '初级岗位年薪5-9万美元（约35-63万人民币）',
      '中级岗位年薪8-20万美元',
      '高级岗位年薪15-30万美元',
      'J1签证免税1-3年',
      '本科硕士申请享受美国J1博士后类似待遇',
      '岗位：研究助理、实验室技术员、研究员等'
    ],
    requirements: [
      '英语熟练，能接受全英文面试',
      '喜欢研发和美国文化，无犯罪记录',
      '应届往届毕业生或在校大学生',
      '本科硕士博士都可申请',
      '有实验室和研发经验者更容易找到雇主',
      '自行承担机票、签证、保险、Sponsor管理等费用'
    ],
    jobTypes: [
      '研究助理', '实验室技术员', '研究员', '实验室助理', '临床研究协调员'
    ]
  },
  {
    id: 'us-2',
    title: '美国J1实习/培训生项目',
    location: '美国',
    type: '实习生/培训生',
    salary: '时薪15-35美元（约105-180元人民币）',
    highlights: [
      '在美国企业带薪实习3-18个月',
      '时薪15-35美元（约105-180元人民币）',
      'J1签证自带工作许可',
      '与大学所学专业相关岗位',
      '积累美国工作经验',
      '提升职业竞争力'
    ],
    requirements: [
      '英语熟练，能接受全英文面试',
      '应届往届毕业生或在校大学生',
      '本科硕士博士都可申请',
      '无犯罪记录',
      '自行承担机票、签证、保险、Sponsor管理等费用'
    ]
  }
];

// 新西兰岗位数据
const newZealandJobs = [
  {
    id: 'nz-1',
    title: '新西兰中餐厨师',
    location: '新西兰',
    type: '中餐厨师',
    salary: '6000纽币/月（约25000+人民币）',
    highlights: [
      '综合月薪6000纽币左右（人民币：25000+/月）',
      '饭店提供工作餐',
      '合同年限：2年（最高可续签10年）',
      '签证持有人可以申请带家属',
      '子女18岁前享受免费教育',
      '每天工作6-12小时（根据具体情况）',
      '月休4-6天'
    ],
    requirements: [
      '男女不限',
      '年龄在55岁以下',
      '有高级厨师证',
      '从事厨师2年以上经验',
      '人要勤快，服从管理'
    ]
  }
];

// 德国岗位数据
const germanyJobs = [
  {
    id: 'de-1',
    title: '德国中餐厅面点师',
    location: '德国',
    type: '面点师',
    salary: '2500欧元/月',
    highlights: [
      '月薪2500欧元，包吃包住',
      '每天工作10小时，周休一天',
      '八个月季节工工作签证，可再次申请',
      '做得好雇主可给转长期',
      '季节工不需要厨师证和毕业证，只需护照',
      '办理流程简单，6-8周即可到岗',
      '离境前可享受退税（约2000多欧）'
    ],
    requirements: [
      '45岁以下，男士优先',
      '会做拉面、包子、饺子等面食',
      '不需要厨师证和毕业证',
      '只需护照即可办理'
    ]
  }
];

// 英国岗位数据
const ukJobs = [
  {
    id: 'uk-1',
    title: '英国按摩推拿师',
    location: '英国',
    type: '按摩推拿师',
    salary: '2600英镑/月',
    highlights: [
      '月薪2600英镑',
      '每天工作8小时，一周工作5天',
      '加班按平常1.25-1.5倍计算',
      '合同期内雇主包食宿',
      '享受当地法定假日',
      '工作满1年有15天带薪年假',
      '回国往返机票雇主承担'
    ],
    requirements: [
      '年龄20-50周岁',
      '有按摩推拿相关经验'
    ]
  },
  {
    id: 'uk-2',
    title: '英国针灸师',
    location: '英国',
    type: '针灸师',
    salary: '2600英镑/月',
    highlights: [
      '月薪2600英镑',
      '每天工作8小时，一周工作5天',
      '加班按平常1.25-1.5倍计算',
      '合同期内雇主包食宿',
      '享受当地法定假日',
      '工作满1年有15天带薪年假',
      '回国往返机票雇主承担'
    ],
    requirements: [
      '年龄20-50周岁',
      '有针灸相关资质和经验'
    ]
  }
];

// 瑞典岗位数据
const swedenJobs = [
  {
    id: 'se-1',
    title: '瑞典餐厅厨师',
    location: '瑞典',
    type: '厨师/面点师',
    salary: '42000瑞典克朗/月',
    highlights: [
      '月薪42000瑞典克朗',
      '每天工作8小时，一周工作5天',
      '加班按平常1.25-1.5倍计算',
      '合同期内包食宿',
      '每年有14天带薪年假',
      '回国往返机票雇主承担'
    ],
    requirements: [
      '年龄20-55周岁',
      '川菜、粤菜、湘菜、鲁菜等菜系',
      '技术熟练、吃苦耐劳、听从管理',
      '相关行业经验',
      '身体健康，无肢体残缺',
      '无对应国家非法滞留史，国内外无犯罪记录'
    ]
  }
];

// 挪威岗位数据
const norwayJobs = [
  {
    id: 'no-1',
    title: '挪威寿司师傅',
    location: '挪威',
    type: '寿司师傅',
    salary: '33000-36200克朗/月（税后约2万人民币）',
    highlights: [
      '税前每月33000-36200克朗（看能力经验）',
      '包吃住（房租5000+克朗）',
      '税后每月约2万人民币左右',
      '约9小时/天，周休1天',
      '合同两年',
      '工作满一年后有带薪休假1个月'
    ],
    requirements: [
      '满足挪威工签要求',
      '必须是真厨师',
      '人品好，性格好',
      '做事勤快踏实配合老板工作安排'
    ]
  }
];

// 加拿大岗位数据
const canadaJobs = [
  {
    id: 'ca-1',
    title: '加拿大建筑普工',
    location: '加拿大',
    type: '建筑普工/干墙安装工',
    salary: '24-35加币/小时（年薪28-40万人民币）',
    highlights: [
      '起步薪资：税后24加币/小时',
      '起步年薪约55,296加币（约合人民币28万元+）',
      '技术熟练：税后35加币/小时',
      '技术熟练年薪约80,640加币（约合人民币40万元+）',
      '干墙安装工',
      '技术兑换价值，薪资可大幅提升'
    ],
    requirements: [
      '身体健康，能适应建筑工作',
      '有建筑行业经验者优先',
      '技术熟练后薪资可提升至35加币/小时'
    ]
  }
];

// 所有岗位数据
const allJobs = [
  {
    country: '韩国',
    countryEmoji: '🇰🇷',
    jobs: koreaJobs
  },
  {
    country: '澳大利亚',
    countryEmoji: '🇦🇺',
    jobs: australiaJobs
  },
  {
    country: '新西兰',
    countryEmoji: '🇳🇿',
    jobs: newZealandJobs
  },
  {
    country: '德国',
    countryEmoji: '🇩🇪',
    jobs: germanyJobs
  },
  {
    country: '英国',
    countryEmoji: '🇬🇧',
    jobs: ukJobs
  },
  {
    country: '瑞典',
    countryEmoji: '🇸🇪',
    jobs: swedenJobs
  },
  {
    country: '挪威',
    countryEmoji: '🇳🇴',
    jobs: norwayJobs
  },
  {
    country: '加拿大',
    countryEmoji: '🇨🇦',
    jobs: canadaJobs
  },
  {
    country: '美国',
    countryEmoji: '🇺🇸',
    jobs: usJobs
  }
];

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const regions = [
    {
      title: '日本',
      subtitle: '热门之选',
      description: '电子工程师、酒店管理、建筑工',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop'
    },
    {
      title: '韩国',
      subtitle: '快速发展',
      description: '厨师、免税店销售、餐饮服务员',
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop'
    },
    {
      title: '新加坡',
      subtitle: '国际都市',
      description: '建筑工、IT工程师、金融',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop'
    },
    {
      title: '澳大利亚',
      subtitle: '高薪机会',
      description: '普工、护士、厨师、卡车司机',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop'
    },
    {
      title: '美国',
      subtitle: '梦想之地',
      description: 'J1研究学者、实习生、年薪35-200万人民币',
      image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop'
    },
    {
      title: '英国',
      subtitle: '精英之路',
      description: '按摩推拿师、针灸师',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop'
    },
    {
      title: '新西兰',
      subtitle: '移民天堂',
      description: '中餐厨师、可带家属、子女免费教育',
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop'
    },
    {
      title: '德国',
      subtitle: '欧洲经济强国',
      description: '面点师、季节工、可转长期',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop'
    },
    {
      title: '瑞典',
      subtitle: '北欧福利国家',
      description: '餐厅厨师、面点师、带薪年假',
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=600&fit=crop'
    },
    {
      title: '挪威',
      subtitle: '高薪北欧',
      description: '寿司师傅、高福利、带薪休假',
      image: '/norway.jpeg'
    },
    {
      title: '加拿大',
      subtitle: '北美高薪',
      description: '建筑普工、干墙安装工、年薪28-40万',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop'
    },
  ];

  // 成功案例数据
  const successCases = [
    {
      id: 1,
      name: '王先生',
      image: '/wang-xiansheng.jpg',
      country: '澳大利亚',
      job: '建筑工程师',
      year: '2021年',
      status: '已获绿卡',
      description: '通过熊猫威士赴澳大利亚工作，从普工做起，凭借勤奋努力，2年后晋升为工程师，现已成功获得澳大利亚永久居留权。',
      salary: '年薪45万人民币',
      highlight: '从普工到工程师的成功蜕变'
    },
    {
      id: 2,
      name: '陈小姐',
      image: '/chen-xiaojie.jpg',
      country: '韩国',
      job: '免税店店长',
      year: '2020年',
      status: '已获绿卡',
      description: '从免税店销售做起，凭借优秀的销售能力和服务意识，3年内晋升为店长，现已获得韩国永久居留权，并组建了幸福家庭。',
      salary: '年薪30万人民币',
      highlight: '从销售员到店长的华丽转身'
    },
    {
      id: 3,
      name: '马女士',
      image: '/ma-nvshi.jpg',
      country: '新西兰',
      job: '中餐厨师',
      year: '2019年',
      status: '已获绿卡',
      description: '作为高级中餐厨师赴新西兰工作，凭借精湛厨艺和敬业精神，深受雇主赏识，现已成功获得新西兰永久居留权，子女享受免费教育。',
      salary: '年薪30万人民币',
      highlight: '技术移民的成功典范'
    }
  ];

  const services = [
    {
      icon: '✈️',
      title: '出国劳务',
      description: '提供日本、韩国、新加坡、欧美等优质岗位'
    },
    {
      icon: '📋',
      title: '签证办理',
      description: '专业团队，工作签证、旅游签证高通过率'
    },
    {
      icon: '🎯',
      title: '就业培训',
      description: '语言培训、技能培训、面试指导'
    },
    {
      icon: '🏠',
      title: '安家服务',
      description: '机票预订、接送机、住宿安排'
    },
  ];

  const stats = [
    { value: '15+', label: '年行业经验' },
    { value: '20+', label: '覆盖国家和地区' },
    { value: '5000+', label: '成功案例' },
    { value: '98%', label: '客户满意度' },
  ];

  const openJobDetail = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="熊猫威士" 
                width={100} 
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">服务项目</a>
              <a href="#countries" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">目的国家</a>
              <a href="#jobs" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">热门岗位</a>
              <a href="#contact" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">联系我们</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="tel:400-888-8888" className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                400-888-8888
              </a>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs h-8 px-4 rounded-full">
                立即咨询
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            助您实现
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              海外就业梦想
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            专业出国劳务服务，覆盖英美澳加新韩国欧盟等国家和地区
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12 px-8 text-base">
              免费咨询 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-gray-300 dark:border-gray-700">
              查看岗位
            </Button>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-16 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              我们的服务
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              一站式出国服务，全程专业指导
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl transition-shadow p-8 text-center rounded-2xl"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 目的国家 */}
      <section id="countries" className="py-20 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              目的国家
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              精选全球优质目的地
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${region.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white/80 text-sm mb-1">{region.subtitle}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{region.title}</h3>
                  <p className="text-white/80 text-sm">{region.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门岗位 - 详细岗位列表 */}
      <section id="jobs" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              热门岗位
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              精选优质岗位，点击查看详细信息
            </p>
          </div>

          {allJobs.map((countryData) => (
            <div key={countryData.country} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{countryData.countryEmoji}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {countryData.country}岗位
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryData.jobs.map((job) => (
                  <div 
                    key={job.id}
                    onClick={() => openJobDetail(job)}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-800 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.location} · {job.type}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-base font-semibold text-green-600 dark:text-green-400">
                        {job.salary}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {job.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                    >
                      查看详情
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 创始人简介 */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              创始人简介
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              专业团队，值得信赖
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧：创始人照片 */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* 背景装饰 */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-3xl blur-xl" />
                {/* 照片容器 - 不裁剪，完整显示 */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-2xl">
                  <img 
                    src="/founder.jpg" 
                    alt="创始人"
                    className="w-64 h-auto rounded-xl object-contain"
                  />
                </div>
                {/* 装饰元素 */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400/30 rounded-full blur-xl" />
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-blue-400/30 rounded-full blur-xl" />
              </div>
            </div>

            {/* 右侧：创始人信息 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  JASPER
                </h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">
                  熊猫威士创始人 · 专业出国劳务服务专家
                </p>
              </div>

              {/* 学历背景 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">🎓</span>
                  学历背景
                </h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>成均馆大学硕士毕业</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3年海外留学加工作背景</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>专门致力于海外工作的职业评估与岗位推荐</span>
                  </li>
                </ul>
              </div>

              {/* 成功案例 */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🏆</span>
                  2024年度成绩单
                </h4>
                <p className="text-lg leading-relaxed">
                  在过去的一年里，本公司成功将<strong className="text-2xl">50位以上</strong>有出国梦的年轻人送出国门，帮助他们实现了海外就业的梦想。<span className="text-yellow-300 font-semibold">助力有梦想的追梦人，从这里走向世界。</span>
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-blue-100 text-sm">成功出国</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-blue-100 text-sm">客户满意</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">15年</div>
                    <div className="text-blue-100 text-sm">行业经验</div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12 px-8">
                立即咨询创始人
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              成功案例
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              他们通过熊猫威士实现了海外梦想，你也可以
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((item) => (
              <div 
                key={item.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                {/* 用户信息 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.country} · {item.job}</p>
                  </div>
                </div>

                {/* 成功标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                    ✓ {item.status}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                    {item.year}出国
                  </span>
                </div>

                {/* 亮点 */}
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                    🌟 {item.highlight}
                  </p>
                </div>

                {/* 描述 */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* 薪资 */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">当前薪资</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{item.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 成功数据 */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-8">用数据说话</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-blue-100 text-sm">成功获绿卡</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100 text-sm">签证通过率</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-blue-100 text-sm">成功案例</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15年</div>
                <div className="text-blue-100 text-sm">行业经验</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            为什么选择熊猫威士
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
            15年行业经验，国家商务部批准资质，专业团队全程服务
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">正规资质</h3>
              <p className="text-gray-600 dark:text-gray-400">
                国家商务部批准的对外劳务合作经营资质，合法合规经营
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">专业团队</h3>
              <p className="text-gray-600 dark:text-gray-400">
                专业签证顾问和法务团队，提供全程专业指导
              </p>
            </div>
            <div>
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">全程服务</h3>
              <p className="text-gray-600 dark:text-gray-400">
                从岗位匹配到签证办理，从行程安排到国外跟踪，全程无忧
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="py-20 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                联系我们
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                如果您有任何问题或需要咨询，欢迎随时联系我们
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">咨询热线</div>
                    <div className="text-gray-600 dark:text-gray-400">400-888-8888</div>
                    <div className="text-gray-600 dark:text-gray-400">0532-88888888</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">公司地址</div>
                    <div className="text-gray-600 dark:text-gray-400">山东省青岛市市南区居庸关路2号</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">工作时间</div>
                    <div className="text-gray-600 dark:text-gray-400">周一至周六 9:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                在线留言
              </h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="您的姓名"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="联系电话"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="意向国家/岗位"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea 
                    rows={4}
                    placeholder="留言内容"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 rounded-full text-base">
                  提交留言
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo.png" 
                  alt="熊猫威士" 
                  width={80} 
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                熊猫威士经济信息科技有限公司
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">服务项目</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">出国劳务</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">签证办理</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">就业培训</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">热门国家</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">日本</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">韩国</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">澳大利亚</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">联系我们</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>400-888-8888</li>
                <li>info@haiouweishi.com</li>
                <li>青岛市市南区居庸关路2号</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-500">
            <p>© 2026 熊猫威士经济信息科技有限公司 版权所有 | 鲁ICP备XXXXXXXX号</p>
          </div>
        </div>
      </footer>

      {/* 岗位详情模态框 */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* 模态框头部 */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {selectedJob.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedJob.location} · {selectedJob.type}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 space-y-6">
              {/* 薪资待遇 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">薪资待遇</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {selectedJob.salary}
                </p>
              </div>

              {/* 岗位亮点 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">岗位亮点</h4>
                </div>
                <div className="space-y-2">
                  {selectedJob.highlights.map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 招聘要求 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">招聘要求</h4>
                </div>
                <div className="space-y-2">
                  {selectedJob.requirements.map((req: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 工种列表（澳大利亚） */}
              {selectedJob.jobTypes && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">招聘工种</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.jobTypes.map((type: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 立即咨询按钮 */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button 
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full h-12"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  立即咨询 400-888-8888
                </Button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                  工作时间：周一至周六 9:00-18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
