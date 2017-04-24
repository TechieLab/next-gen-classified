
export class Constants {

  public static AppName: string = "Rp Classified";
  //public static BaseApi: string = 'http://10.13.168.141:3000'; 
  public static BaseApi: string = 'http://localhost:3000' /*'http://ramesh-sharma.cloudapp.net'*/;
  //public static BaseApi: string = 'http://ramesh-sharma.cloudapp.net';
  public static ElasticApi: string = Constants.BaseApi + '/api/search/';
  public static LookupApi: string = Constants.BaseApi + '/api/lookups/';
  public static PostApi: string = Constants.BaseApi + '/api/posts/';
  public static AccountApi: string = Constants.BaseApi + '/api/account/';
  public static ProfileApi: string = Constants.BaseApi + '/api/profiles/';

  public static SortBy: any = [{
    Name: 'High Price',
    Value: 'Price',
    Order: -1,
  }, {
    Name: 'Low Price',
    Value: 'Price',
    Order: 1
  }, {
    Name: 'Recent Post',
    Value: 'ModifiedOn',
    Order: -1,
  }, {
    Name: 'Old Post',
    Value: 'ModifiedOn',
    Order: 1,
  }, {
    Name: 'Discount',
    Value: 'Discount',
    Order: -1,
  }];

}