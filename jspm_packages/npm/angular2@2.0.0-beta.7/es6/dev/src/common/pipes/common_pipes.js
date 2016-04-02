/* */ 
"format cjs";
import { AsyncPipe } from './async_pipe';
import { UpperCasePipe } from './uppercase_pipe';
import { LowerCasePipe } from './lowercase_pipe';
import { JsonPipe } from './json_pipe';
import { SlicePipe } from './slice_pipe';
import { DatePipe } from './date_pipe';
import { DecimalPipe, PercentPipe, CurrencyPipe } from './number_pipe';
import { CONST_EXPR } from 'angular2/src/facade/lang';
/**
 * A collection of Angular core pipes that are likely to be used in each and every
 * application.
 *
 * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
 * property of the `@Component` or `@View` decorators.
 */
export const COMMON_PIPES = CONST_EXPR([
    AsyncPipe,
    UpperCasePipe,
    LowerCasePipe,
    JsonPipe,
    SlicePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    DatePipe
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3BpcGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbW1vbi9waXBlcy9jb21tb25fcGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BS08sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjO09BQy9CLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCO09BQ3ZDLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCO09BQ3ZDLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYTtPQUM3QixFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWM7T0FDL0IsRUFBQyxRQUFRLEVBQUMsTUFBTSxhQUFhO09BQzdCLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlO09BQzdELEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCO0FBRW5EOzs7Ozs7R0FNRztBQUNILGFBQWEsWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUNyQyxTQUFTO0lBQ1QsYUFBYTtJQUNiLGFBQWE7SUFDYixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxXQUFXO0lBQ1gsWUFBWTtJQUNaLFFBQVE7Q0FDVCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYSBzZXQgb2YgY29tbW9uIFBpcGVzLlxuICovXG5pbXBvcnQge0FzeW5jUGlwZX0gZnJvbSAnLi9hc3luY19waXBlJztcbmltcG9ydCB7VXBwZXJDYXNlUGlwZX0gZnJvbSAnLi91cHBlcmNhc2VfcGlwZSc7XG5pbXBvcnQge0xvd2VyQ2FzZVBpcGV9IGZyb20gJy4vbG93ZXJjYXNlX3BpcGUnO1xuaW1wb3J0IHtKc29uUGlwZX0gZnJvbSAnLi9qc29uX3BpcGUnO1xuaW1wb3J0IHtTbGljZVBpcGV9IGZyb20gJy4vc2xpY2VfcGlwZSc7XG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICcuL2RhdGVfcGlwZSc7XG5pbXBvcnQge0RlY2ltYWxQaXBlLCBQZXJjZW50UGlwZSwgQ3VycmVuY3lQaXBlfSBmcm9tICcuL251bWJlcl9waXBlJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgQW5ndWxhciBjb3JlIHBpcGVzIHRoYXQgYXJlIGxpa2VseSB0byBiZSB1c2VkIGluIGVhY2ggYW5kIGV2ZXJ5XG4gKiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBUaGlzIGNvbGxlY3Rpb24gY2FuIGJlIHVzZWQgdG8gcXVpY2tseSBlbnVtZXJhdGUgYWxsIHRoZSBidWlsdC1pbiBwaXBlcyBpbiB0aGUgYHBpcGVzYFxuICogcHJvcGVydHkgb2YgdGhlIGBAQ29tcG9uZW50YCBvciBgQFZpZXdgIGRlY29yYXRvcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBDT01NT05fUElQRVMgPSBDT05TVF9FWFBSKFtcbiAgQXN5bmNQaXBlLFxuICBVcHBlckNhc2VQaXBlLFxuICBMb3dlckNhc2VQaXBlLFxuICBKc29uUGlwZSxcbiAgU2xpY2VQaXBlLFxuICBEZWNpbWFsUGlwZSxcbiAgUGVyY2VudFBpcGUsXG4gIEN1cnJlbmN5UGlwZSxcbiAgRGF0ZVBpcGVcbl0pO1xuIl19