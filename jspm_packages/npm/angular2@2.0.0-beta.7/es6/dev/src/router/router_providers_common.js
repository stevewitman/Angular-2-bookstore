/* */ 
"format cjs";
import { LocationStrategy } from 'angular2/src/router/location_strategy';
import { PathLocationStrategy } from 'angular2/src/router/path_location_strategy';
import { Router, RootRouter } from 'angular2/src/router/router';
import { RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/src/router/route_registry';
import { Location } from 'angular2/src/router/location';
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { ApplicationRef, Provider } from 'angular2/core';
import { BaseException } from 'angular2/src/facade/exceptions';
/**
 * The Platform agnostic ROUTER PROVIDERS
 */
export const ROUTER_PROVIDERS_COMMON = CONST_EXPR([
    RouteRegistry,
    CONST_EXPR(new Provider(LocationStrategy, { useClass: PathLocationStrategy })),
    Location,
    CONST_EXPR(new Provider(Router, {
        useFactory: routerFactory,
        deps: CONST_EXPR([RouteRegistry, Location, ROUTER_PRIMARY_COMPONENT, ApplicationRef])
    })),
    CONST_EXPR(new Provider(ROUTER_PRIMARY_COMPONENT, { useFactory: routerPrimaryComponentFactory, deps: CONST_EXPR([ApplicationRef]) }))
]);
function routerFactory(registry, location, primaryComponent, appRef) {
    var rootRouter = new RootRouter(registry, location, primaryComponent);
    appRef.registerDisposeListener(() => rootRouter.dispose());
    return rootRouter;
}
function routerPrimaryComponentFactory(app) {
    if (app.componentTypes.length == 0) {
        throw new BaseException("Bootstrap at least one component before injecting Router.");
    }
    return app.componentTypes[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVyc19jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNfY29tbW9uLnRzIl0sIm5hbWVzIjpbInJvdXRlckZhY3RvcnkiLCJyb3V0ZXJQcmltYXJ5Q29tcG9uZW50RmFjdG9yeSJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVDQUF1QztPQUMvRCxFQUFDLG9CQUFvQixFQUFDLE1BQU0sNENBQTRDO09BQ3hFLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLDRCQUE0QjtPQUN0RCxFQUFDLGFBQWEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLG9DQUFvQztPQUNuRixFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QjtPQUM5QyxFQUFDLFVBQVUsRUFBTyxNQUFNLDBCQUEwQjtPQUNsRCxFQUFDLGNBQWMsRUFBZSxRQUFRLEVBQUMsTUFBTSxlQUFlO09BQzVELEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0NBQWdDO0FBRTVEOztHQUVHO0FBQ0gsYUFBYSx1QkFBdUIsR0FBVSxVQUFVLENBQUM7SUFDdkQsYUFBYTtJQUNiLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7SUFDNUUsUUFBUTtJQUNSLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FDbkIsTUFBTSxFQUNOO1FBQ0UsVUFBVSxFQUFFLGFBQWE7UUFDekIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDdEYsQ0FBQyxDQUFDO0lBQ1AsVUFBVSxDQUFDLElBQUksUUFBUSxDQUNuQix3QkFBd0IsRUFDeEIsRUFBQyxVQUFVLEVBQUUsNkJBQTZCLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0NBQ3RGLENBQUMsQ0FBQztBQUVILHVCQUF1QixRQUF1QixFQUFFLFFBQWtCLEVBQUUsZ0JBQXNCLEVBQ25FLE1BQXNCO0lBQzNDQSxJQUFJQSxVQUFVQSxHQUFHQSxJQUFJQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxRQUFRQSxFQUFFQSxnQkFBZ0JBLENBQUNBLENBQUNBO0lBQ3RFQSxNQUFNQSxDQUFDQSx1QkFBdUJBLENBQUNBLE1BQU1BLFVBQVVBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBO0lBQzNEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtBQUNwQkEsQ0FBQ0E7QUFFRCx1Q0FBdUMsR0FBbUI7SUFDeERDLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ25DQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSwyREFBMkRBLENBQUNBLENBQUNBO0lBQ3ZGQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUMvQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtQYXRoTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9wYXRoX2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7Um91dGVyLCBSb290Um91dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlUmVnaXN0cnksIFJPVVRFUl9QUklNQVJZX0NPTVBPTkVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZV9yZWdpc3RyeSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uJztcbmltcG9ydCB7Q09OU1RfRVhQUiwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QXBwbGljYXRpb25SZWYsIE9wYXF1ZVRva2VuLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbi8qKlxuICogVGhlIFBsYXRmb3JtIGFnbm9zdGljIFJPVVRFUiBQUk9WSURFUlNcbiAqL1xuZXhwb3J0IGNvbnN0IFJPVVRFUl9QUk9WSURFUlNfQ09NTU9OOiBhbnlbXSA9IENPTlNUX0VYUFIoW1xuICBSb3V0ZVJlZ2lzdHJ5LFxuICBDT05TVF9FWFBSKG5ldyBQcm92aWRlcihMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IFBhdGhMb2NhdGlvblN0cmF0ZWd5fSkpLFxuICBMb2NhdGlvbixcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoXG4gICAgICBSb3V0ZXIsXG4gICAgICB7XG4gICAgICAgIHVzZUZhY3Rvcnk6IHJvdXRlckZhY3RvcnksXG4gICAgICAgIGRlcHM6IENPTlNUX0VYUFIoW1JvdXRlUmVnaXN0cnksIExvY2F0aW9uLCBST1VURVJfUFJJTUFSWV9DT01QT05FTlQsIEFwcGxpY2F0aW9uUmVmXSlcbiAgICAgIH0pKSxcbiAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoXG4gICAgICBST1VURVJfUFJJTUFSWV9DT01QT05FTlQsXG4gICAgICB7dXNlRmFjdG9yeTogcm91dGVyUHJpbWFyeUNvbXBvbmVudEZhY3RvcnksIGRlcHM6IENPTlNUX0VYUFIoW0FwcGxpY2F0aW9uUmVmXSl9KSlcbl0pO1xuXG5mdW5jdGlvbiByb3V0ZXJGYWN0b3J5KHJlZ2lzdHJ5OiBSb3V0ZVJlZ2lzdHJ5LCBsb2NhdGlvbjogTG9jYXRpb24sIHByaW1hcnlDb21wb25lbnQ6IFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgIGFwcFJlZjogQXBwbGljYXRpb25SZWYpOiBSb290Um91dGVyIHtcbiAgdmFyIHJvb3RSb3V0ZXIgPSBuZXcgUm9vdFJvdXRlcihyZWdpc3RyeSwgbG9jYXRpb24sIHByaW1hcnlDb21wb25lbnQpO1xuICBhcHBSZWYucmVnaXN0ZXJEaXNwb3NlTGlzdGVuZXIoKCkgPT4gcm9vdFJvdXRlci5kaXNwb3NlKCkpO1xuICByZXR1cm4gcm9vdFJvdXRlcjtcbn1cblxuZnVuY3Rpb24gcm91dGVyUHJpbWFyeUNvbXBvbmVudEZhY3RvcnkoYXBwOiBBcHBsaWNhdGlvblJlZik6IFR5cGUge1xuICBpZiAoYXBwLmNvbXBvbmVudFR5cGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oXCJCb290c3RyYXAgYXQgbGVhc3Qgb25lIGNvbXBvbmVudCBiZWZvcmUgaW5qZWN0aW5nIFJvdXRlci5cIik7XG4gIH1cbiAgcmV0dXJuIGFwcC5jb21wb25lbnRUeXBlc1swXTtcbn1cbiJdfQ==