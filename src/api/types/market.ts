export interface IMarketInfo {
  id: number;
  all_time_high: string;
  circulating_supply: string;
  code: string;
  coming_soon: boolean;
  currency1: IMarketCurrency;
  currency2: IMarketCurrency;
  for_test: boolean;
  freshness_weight: number;
  internal_price_info: IMarketOrderBookInfo;
  market_cap: string;
  order_book_info: IMarketOrderBookInfo;
  otc_buy_percent: string;
  otc_market: boolean;
  otc_max_buy_amount: string;
  otc_max_sell_amount: string;
  otc_sell_percent: string;
  otc_tradable: boolean;
  popularity_weight: number;
  price: string;
  price_increment: string;
  price_info: IMarketOrderBookInfo;
  text: string;
  title: string;
  title_fa: string;
  tradable: boolean;
  trading_view_source: string;
  trading_view_symbol: string;
  volume_24h: string;
}

export interface IMarketCurrency {
  id: number;
  code: string;
  color: string;
  decimal: number;
  decimal_amount: number;
  decimal_irt: number;
  etf: boolean;
  for_binvest: boolean;
  for_loan: boolean;
  for_stake: boolean;
  for_test: boolean;
  high_risk: boolean;
  image: string;
  recommend_for_deposit_weight: number;
  show_high_risk: boolean;
  tags: IMarketTag[];
  title: string;
  title_fa: string;
  tradable: boolean;
  withdraw_commission: string;
}

export interface IMarketTag {
  id: number;
  has_chart: boolean;
  name: string;
  name_en: string;
}

export interface IMarketOrderBookInfo {
  amount: string;
  change: number;
  created_at: string;
  max: string;
  mean: string;
  min: string;
  price: string;
  time: string;
  value: string;
}
