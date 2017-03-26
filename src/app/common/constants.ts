
export class Constants {

  public static AppName: string = "Rp Classified";
  public static BaseApi: string = 'http://192.168.0.107:3000';
  public static ElasticApi : string = "http://192.168.0.107:9201";
  public static LookupApi: string = Constants.BaseApi + '/api/lookups/';
  public static PostApi : string =  Constants.BaseApi +'/api/posts/';
  public static AccountApi: string = Constants.BaseApi + '/api/account/';
  public static ProfileApi : string = Constants.BaseApi + '/api/profile/';

}