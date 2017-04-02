
export class Constants {

  public static AppName: string = "Rp Classified";
  public static BaseApi: string = /*'http://127.0.0.1:3000' */'http://ramesh-sharma.cloudapp.net';
  public static ElasticApi : string = "http://52.187.133.250:9200";
  public static LookupApi: string = Constants.BaseApi + '/api/lookups/';
  public static PostApi : string =  Constants.BaseApi +'/api/posts/';
  public static AccountApi: string = Constants.BaseApi + '/api/account/';
  public static ProfileApi : string = Constants.BaseApi + '/api/profile/';

}