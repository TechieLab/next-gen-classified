
export class Constants {

  public static AppName: string = "Rp Classified";
  //public static BaseApi: string = 'http://10.13.168.141:3000'; 
  //public static BaseApi: string = 'http://192.168.0.103:3000' /*'http://ramesh-sharma.cloudapp.net'*/;
  public static BaseApi: string = 'http://ramesh-sharma.cloudapp.net';
  public static ElasticApi: string = Constants.BaseApi + '/api/search/';
  public static LookupApi: string = Constants.BaseApi + '/api/lookups/';
  public static PostApi: string = Constants.BaseApi + '/api/posts/';
  public static AccountApi: string = Constants.BaseApi + '/api/account/';
  public static ProfileApi: string = Constants.BaseApi + '/api/profiles/';

}