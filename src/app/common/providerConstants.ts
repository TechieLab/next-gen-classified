

import { ILookupService, LookupService } from '../services/lookup.service';
import { IUserService, UserService } from '../services/user.service';
import { ProfileService, IProfileService } from '../../app/services/profile.service';
import { AuthGuard } from '../services/guard.service';

export const AppProviders = [
    { provide: LookupService, useClass: LookupService },
    { provide: ProfileService, useClass: ProfileService },
    { provide: UserService, useClass: UserService },
    { provide: AuthGuard, useClass: AuthGuard }
];