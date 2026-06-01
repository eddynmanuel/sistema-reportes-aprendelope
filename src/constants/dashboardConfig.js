import {
  DollarSign,
  ShoppingCart,
  Percent,
  Users,
  Handshake,
  CreditCard,
  ThumbsDown,
  Clock,
  MessageSquare,
} from 'lucide-react';

// ============================================================
// COLORES DE MARCA
// ============================================================
export const BRAND_COLORS = {
  PRIMARY:  '#34155E',
  ORANGE:   '#EE531F',
  YELLOW:   '#F9A825',
  SUCCESS:  '#10B981',
  DANGER:   '#EF4444',
  WARNING:  '#F59E0B',
  INFO:     '#3B82F6',
};

// ============================================================
// CONFIGURACIÓN DE KPIs (RF02)
// Cada objeto define un indicador clave de desempeño.
// ============================================================
export const KPI_CONFIG = [
  {
    key: 'totalRevenue',
    title: 'Monto Total Vendido',
    icon: DollarSign,
    unit: 'S/',
    colorVariant: 'purple',
    description: 'Ingresos totales generados en el período',
  },
  {
    key: 'totalSales',
    title: 'Cantidad de Ventas',
    icon: ShoppingCart,
    unit: null,
    colorVariant: 'orange',
    description: 'Número de cierres exitosos',
  },
  {
    key: 'conversionRate',
    title: 'Tasa de Conversión',
    icon: Percent,
    unit: '%',
    colorVariant: 'yellow',
    description: 'Porcentaje de leads convertidos',
  },
  {
    key: 'interestedClients',
    title: 'Clientes Interesados',
    icon: Users,
    unit: null,
    colorVariant: 'info',
    description: 'Prospectos activos en el embudo',
  },
  {
    key: 'inNegotiation',
    title: 'En Negociación',
    icon: Handshake,
    unit: null,
    colorVariant: 'warning',
    description: 'Clientes en proceso de cierre',
  },
  {
    key: 'pendingPayments',
    title: 'Pagos Pendientes',
    icon: CreditCard,
    unit: 'S/',
    colorVariant: 'danger',
    description: 'Montos por cobrar del período',
  },
  {
    key: 'lostOpportunities',
    title: 'Oportunidades Perdidas',
    icon: ThumbsDown,
    unit: null,
    colorVariant: 'danger',
    description: 'Leads que no llegaron a cierre',
  },
  {
    key: 'avgConversionTime',
    title: 'Tiempo Prom. Conversión',
    icon: Clock,
    unit: null,
    colorVariant: 'purple',
    description: 'Promedio de días desde contacto hasta cierre',
  },
  {
    key: 'messageMetrics',
    title: 'Mensajes Respondidos',
    icon: MessageSquare,
    unit: null,
    colorVariant: 'success',
    description: 'Tasa de respuesta en canales digitales',
  },
];

// ============================================================
// DATOS MOCK (reemplazar con respuesta real de API - RF05)
// ============================================================
export const MOCK_KPI_VALUES = {
  totalRevenue:       { value: '12,750', change: 10.1 },
  totalSales:         { value: '160',    change: 14.8 },
  conversionRate:     { value: '72.7',   change: -3.2 },
  interestedClients:  { value: '38',     change: 5.3  },
  inNegotiation:      { value: '12',     change: null },
  pendingPayments:    { value: '3,200',  change: null },
  lostOpportunities:  { value: '7',      change: -12.5 },
  avgConversionTime:  { value: '4.2 días', change: -8.0 },
  messageMetrics:     { value: '96.4%',  change: 2.1  },
};

export const MOCK_SALES_DATA = [
  { name: 'Sem 1', monto: 2400, ventas: 30 },
  { name: 'Sem 2', monto: 3500, ventas: 45 },
  { name: 'Sem 3', monto: 4100, ventas: 52 },
  { name: 'Sem 4', monto: 2750, ventas: 33 },
];

export const MOCK_MESSAGES_DATA = [
  { name: 'Lun', recibidos: 120, respondidos: 115 },
  { name: 'Mar', recibidos: 180, respondidos: 172 },
  { name: 'Mié', recibidos: 250, respondidos: 240 },
  { name: 'Jue', recibidos: 210, respondidos: 205 },
  { name: 'Vie', recibidos: 300, respondidos: 290 },
];

export const MOCK_FUNNEL_DATA = [
  { label: 'Clientes Interesados', count: 120, percentage: 100 },
  { label: 'En Negociación',       count: 65,  percentage: 54  },
  { label: 'Ventas Exitosas',      count: 42,  percentage: 35  },
  { label: 'Oportunidades Perd.',  count: 7,   percentage: 6   },
];

export const MOCK_CONVERSION_DATA = [
  { name: 'Convertidos',  value: 42, color: BRAND_COLORS.PRIMARY  },
  { name: 'En proceso',   value: 65, color: BRAND_COLORS.YELLOW   },
  { name: 'Perdidos',     value: 7,  color: BRAND_COLORS.DANGER   },
];

// ============================================================
// OPCIONES DE FILTROS (RF03)
// ============================================================
export const DATE_RANGE_OPTIONS = [
  { value: 'today',        label: 'Hoy'                  },
  { value: 'last_7_days',  label: 'Últimos 7 días'       },
  { value: 'this_month',   label: 'Este Mes (Jun 2026)'  },
  { value: 'last_quarter', label: 'Último Trimestre'     },
  { value: 'this_year',    label: 'Este Año'             },
];

export const ADVISOR_OPTIONS = [
  { value: 'all', label: 'Todos los Asesores' },
  { value: '1',   label: 'Carlos Mendoza'     },
  { value: '2',   label: 'Ana Gómez'          },
  { value: '3',   label: 'Luis Ríos'          },
];

export const CHANNEL_OPTIONS = [
  { value: 'all',       label: 'Todos los Canales'  },
  { value: 'whatsapp',  label: 'WhatsApp Business'  },
  { value: 'instagram', label: 'Instagram Direct'   },
  { value: 'facebook',  label: 'Facebook Messenger' },
  { value: 'email',     label: 'Email'              },
];

// ============================================================
// CONFIGURACIÓN GENERAL DEL DASHBOARD
// ============================================================
export const DASHBOARD_CONFIG = {
  COLORS: BRAND_COLORS,
  DEFAULT_DATE_RANGE:   'this_month',
  REFRESH_INTERVAL_MS:  300_000, // 5 minutos
};