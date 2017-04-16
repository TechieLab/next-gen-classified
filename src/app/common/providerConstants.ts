

import { ILookupService, LookupService } from '../services/lookup.service';
import { IUserService, UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { AuthGuard } from '../services/guard.service';
import { ExternalService } from '../services/external.service';
import { OfferService } from '../../pages/offers/offer.service';
//import { ElasticSearchService } from '../services/elasticsearch.service';

export const AppProviders = [
    { provide: LookupService, useClass: LookupService },
    { provide: UserService, useClass: UserService },
    { provide: UploadService, useClass: UploadService },
    { provide: AuthGuard, useClass: AuthGuard },
    { provide: OfferService, useClass: OfferService },
    { provide: ExternalService, useClass: ExternalService }
];