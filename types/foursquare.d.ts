export interface Meta {
  code: number;
  requestId: string;
}

export interface NotificationItem {
  unreadCount: number;
}

export interface Notification {
  type: string;
  item: NotificationItem;
}

export interface LabeledLatLng {
  label: string;
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  lat: number;
  lng: number;
  labeledLatLngs: LabeledLatLng[];
  postalCode: string;
  cc: string;
  city: string;
  state: string;
  country: string;
  formattedAddress: string[];
}

export interface Icon {
  prefix: string;
  suffix: string;
}

export interface Category {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
  icon: Icon;
  primary: true;
}

export interface Venue {
  id: string;
  name: string;
  location: Location;
  categories: Category[];
}

export interface CheckinItem {
  id: string;
  createdAt: number;
  type: string; // "checkin"
  // entities?: [];
  // shout?: string;
  timeZoneOffset: number;
  // editableUntil?: number;
  venue: Venue;
  // likes: {
  //   "count": 0,
  //   "groups": []
  // },
  // like: boolean;
  // isMayor: boolean;
  // photos: {
  //   count: 0,
  //   items: []
  // },
  // posts: {
  //   count: 0,
  //   textCount: 0
  // },
  // comments: {
  //   count: 0
  // },
  // source: {
  //   name: "Swarm for iOS",
  //   url: "https://www.swarmapp.com"
  // }
}

export interface Checkins {
  count: number;
  items: CheckinItem[];
}

export interface CheckinResponse {
  checkins: Checkins;
}

export interface CheckinResponseBody {
  meta: Meta;
  notifications: Notification[];
  response: CheckinResponse;
}
