/* */ 
"format cjs";
import { CONST_EXPR, isPresent, isBlank, looseIdentical, isPrimitive } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { StringMapWrapper, isListLikeIterable, areIterablesEqual } from 'angular2/src/facade/collection';
import { ChangeDetectionStrategy, isDefaultChangeDetectionStrategy } from './constants';
import { implementsOnDestroy } from './pipe_lifecycle_reflector';
import { BindingTarget } from './binding_record';
import { DirectiveIndex } from './directive_record';
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
export class WrappedValue {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    static wrap(value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    }
}
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * Represents a basic change from a previous to a new value.
 */
export class SimpleChange {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange() { return this.previousValue === ChangeDetectionUtil.uninitialized; }
}
var _simpleChangesIndex = 0;
var _simpleChanges = [
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null)
];
function _simpleChange(previousValue, currentValue) {
    var index = _simpleChangesIndex++ % 20;
    var s = _simpleChanges[index];
    s.previousValue = previousValue;
    s.currentValue = currentValue;
    return s;
}
/* tslint:disable:requireParameterType */
export class ChangeDetectionUtil {
    static arrayFn0() { return []; }
    static arrayFn1(a1) { return [a1]; }
    static arrayFn2(a1, a2) { return [a1, a2]; }
    static arrayFn3(a1, a2, a3) { return [a1, a2, a3]; }
    static arrayFn4(a1, a2, a3, a4) { return [a1, a2, a3, a4]; }
    static arrayFn5(a1, a2, a3, a4, a5) { return [a1, a2, a3, a4, a5]; }
    static arrayFn6(a1, a2, a3, a4, a5, a6) { return [a1, a2, a3, a4, a5, a6]; }
    static arrayFn7(a1, a2, a3, a4, a5, a6, a7) { return [a1, a2, a3, a4, a5, a6, a7]; }
    static arrayFn8(a1, a2, a3, a4, a5, a6, a7, a8) {
        return [a1, a2, a3, a4, a5, a6, a7, a8];
    }
    static arrayFn9(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    }
    static operation_negate(value) { return !value; }
    static operation_add(left, right) { return left + right; }
    static operation_subtract(left, right) { return left - right; }
    static operation_multiply(left, right) { return left * right; }
    static operation_divide(left, right) { return left / right; }
    static operation_remainder(left, right) { return left % right; }
    static operation_equals(left, right) { return left == right; }
    static operation_not_equals(left, right) { return left != right; }
    static operation_identical(left, right) { return left === right; }
    static operation_not_identical(left, right) { return left !== right; }
    static operation_less_then(left, right) { return left < right; }
    static operation_greater_then(left, right) { return left > right; }
    static operation_less_or_equals_then(left, right) { return left <= right; }
    static operation_greater_or_equals_then(left, right) { return left >= right; }
    static cond(cond, trueVal, falseVal) { return cond ? trueVal : falseVal; }
    static mapFn(keys) {
        function buildMap(values) {
            var res = StringMapWrapper.create();
            for (var i = 0; i < keys.length; ++i) {
                StringMapWrapper.set(res, keys[i], values[i]);
            }
            return res;
        }
        switch (keys.length) {
            case 0:
                return () => [];
            case 1:
                return (a1) => buildMap([a1]);
            case 2:
                return (a1, a2) => buildMap([a1, a2]);
            case 3:
                return (a1, a2, a3) => buildMap([a1, a2, a3]);
            case 4:
                return (a1, a2, a3, a4) => buildMap([a1, a2, a3, a4]);
            case 5:
                return (a1, a2, a3, a4, a5) => buildMap([a1, a2, a3, a4, a5]);
            case 6:
                return (a1, a2, a3, a4, a5, a6) => buildMap([a1, a2, a3, a4, a5, a6]);
            case 7:
                return (a1, a2, a3, a4, a5, a6, a7) => buildMap([a1, a2, a3, a4, a5, a6, a7]);
            case 8:
                return (a1, a2, a3, a4, a5, a6, a7, a8) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
            case 9:
                return (a1, a2, a3, a4, a5, a6, a7, a8, a9) => buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
            default:
                throw new BaseException(`Does not support literal maps with more than 9 elements`);
        }
    }
    static keyedAccess(obj, args) { return obj[args[0]]; }
    static unwrapValue(value) {
        if (value instanceof WrappedValue) {
            return value.wrapped;
        }
        else {
            return value;
        }
    }
    static changeDetectionMode(strategy) {
        return isDefaultChangeDetectionStrategy(strategy) ? ChangeDetectionStrategy.CheckAlways :
            ChangeDetectionStrategy.CheckOnce;
    }
    static simpleChange(previousValue, currentValue) {
        return _simpleChange(previousValue, currentValue);
    }
    static isValueBlank(value) { return isBlank(value); }
    static s(value) { return isPresent(value) ? `${value}` : ''; }
    static protoByIndex(protos, selfIndex) {
        return selfIndex < 1 ?
            null :
            protos[selfIndex - 1]; // self index is shifted by one because of context
    }
    static callPipeOnDestroy(selectedPipe) {
        if (implementsOnDestroy(selectedPipe.pipe)) {
            selectedPipe.pipe.ngOnDestroy();
        }
    }
    static bindingTarget(mode, elementIndex, name, unit, debug) {
        return new BindingTarget(mode, elementIndex, name, unit, debug);
    }
    static directiveIndex(elementIndex, directiveIndex) {
        return new DirectiveIndex(elementIndex, directiveIndex);
    }
    static looseNotIdentical(a, b) { return !looseIdentical(a, b); }
    static devModeEqual(a, b) {
        if (isListLikeIterable(a) && isListLikeIterable(b)) {
            return areIterablesEqual(a, b, ChangeDetectionUtil.devModeEqual);
        }
        else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) &&
            !isPrimitive(b)) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
}
ChangeDetectionUtil.uninitialized = CONST_EXPR(new Object());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOlsiV3JhcHBlZFZhbHVlIiwiV3JhcHBlZFZhbHVlLmNvbnN0cnVjdG9yIiwiV3JhcHBlZFZhbHVlLndyYXAiLCJTaW1wbGVDaGFuZ2UiLCJTaW1wbGVDaGFuZ2UuY29uc3RydWN0b3IiLCJTaW1wbGVDaGFuZ2UuaXNGaXJzdENoYW5nZSIsIl9zaW1wbGVDaGFuZ2UiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMCIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjEiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm4yIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMyIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm41IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuNiIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjciLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm44IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuOSIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX25lZ2F0ZSIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2FkZCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX3N1YnRyYWN0IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbXVsdGlwbHkiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9kaXZpZGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9yZW1haW5kZXIiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9lcXVhbHMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ub3RfZXF1YWxzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25faWRlbnRpY2FsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbm90X2lkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2xlc3NfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2dyZWF0ZXJfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2xlc3Nfb3JfZXF1YWxzX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ncmVhdGVyX29yX2VxdWFsc190aGVuIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5jb25kIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5tYXBGbiIsIkNoYW5nZURldGVjdGlvblV0aWwubWFwRm4uYnVpbGRNYXAiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmtleWVkQWNjZXNzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bndyYXBWYWx1ZSIsIkNoYW5nZURldGVjdGlvblV0aWwuY2hhbmdlRGV0ZWN0aW9uTW9kZSIsIkNoYW5nZURldGVjdGlvblV0aWwuc2ltcGxlQ2hhbmdlIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5pc1ZhbHVlQmxhbmsiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnByb3RvQnlJbmRleCIsIkNoYW5nZURldGVjdGlvblV0aWwuY2FsbFBpcGVPbkRlc3Ryb3kiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmJpbmRpbmdUYXJnZXQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmRpcmVjdGl2ZUluZGV4IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5sb29zZU5vdElkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwuZGV2TW9kZUVxdWFsIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUdQ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QSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNuRUwsT0FBT0EsUUFBUUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBV00sTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDM0VOLE9BQU9BLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQVdPLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBQ25GUCxPQUFPQSxRQUFRQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXUSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMzRlIsT0FBT0EsUUFBUUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUE7UUFDNUNTLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNB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Q0pBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hEQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaEVBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4RUEsS0FBS0EsQ0FBQ0E7Z0JBQ0pBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hGQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEZBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUMvQkEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNURBO2dCQUNFQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUFDQSx5REFBeURBLENBQUNBLENBQUNBO1FBQ3ZGQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVEMUIsT0FBT0EsV0FBV0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsSUFBUzRCLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRTNENUIsT0FBT0EsV0FBV0EsQ0FBQ0EsS0FBVUE7UUFDM0I2QixFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxZQUFZQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDdkJBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBO1FBQ2ZBLENBQUNBO0lBQ0hBLENBQUNBO0lBRUQ3QixP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Q0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLENBQUNBO0lBQ0hBLENBQUNBO0FBQ0h2QyxDQUFDQTtBQS9IUSxpQ0FBYSxHQUFXLFVBQVUsQ0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBK0hoRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENPTlNUX0VYUFIsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgbG9vc2VJZGVudGljYWwsXG4gIGlzUHJpbWl0aXZlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgTWFwV3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgaXNMaXN0TGlrZUl0ZXJhYmxlLFxuICBhcmVJdGVyYWJsZXNFcXVhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm90b1JlY29yZH0gZnJvbSAnLi9wcm90b19yZWNvcmQnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7aW1wbGVtZW50c09uRGVzdHJveX0gZnJvbSAnLi9waXBlX2xpZmVjeWNsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtCaW5kaW5nVGFyZ2V0fSBmcm9tICcuL2JpbmRpbmdfcmVjb3JkJztcbmltcG9ydCB7RGlyZWN0aXZlSW5kZXh9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5pbXBvcnQge1NlbGVjdGVkUGlwZX0gZnJvbSAnLi9waXBlcyc7XG5cblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcmVzdWx0IG9mIGEge0BsaW5rIFBpcGVNZXRhZGF0YX0gdHJhbnNmb3JtYXRpb24gaGFzIGNoYW5nZWQgZXZlbiB0aG91Z2ggdGhlXG4gKiByZWZlcmVuY2VcbiAqIGhhcyBub3QgY2hhbmdlZC5cbiAqXG4gKiBUaGUgd3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHVud3JhcHBlZCBieSBjaGFuZ2UgZGV0ZWN0aW9uLCBhbmQgdGhlIHVud3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHN0b3JlZC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAqICB9IGVsc2Uge1xuICogICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICogICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTsgLy8gdGhpcyB3aWxsIGZvcmNlIHVwZGF0ZVxuICogIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgV3JhcHBlZFZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHdyYXBwZWQ6IGFueSkge31cblxuICBzdGF0aWMgd3JhcCh2YWx1ZTogYW55KTogV3JhcHBlZFZhbHVlIHtcbiAgICB2YXIgdyA9IF93cmFwcGVkVmFsdWVzW193cmFwcGVkSW5kZXgrKyAlIDVdO1xuICAgIHcud3JhcHBlZCA9IHZhbHVlO1xuICAgIHJldHVybiB3O1xuICB9XG59XG5cbnZhciBfd3JhcHBlZFZhbHVlcyA9IFtcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKVxuXTtcblxudmFyIF93cmFwcGVkSW5kZXggPSAwO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBjaGFuZ2UgZnJvbSBhIHByZXZpb3VzIHRvIGEgbmV3IHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByZXZpb3VzVmFsdWU6IGFueSwgcHVibGljIGN1cnJlbnRWYWx1ZTogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgaXMgdGhlIGZpcnN0IHZhbHVlIGFzc2lnbmVkLlxuICAgKi9cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bmluaXRpYWxpemVkOyB9XG59XG5cbnZhciBfc2ltcGxlQ2hhbmdlc0luZGV4ID0gMDtcbnZhciBfc2ltcGxlQ2hhbmdlcyA9IFtcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKVxuXTtcblxuZnVuY3Rpb24gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpOiBTaW1wbGVDaGFuZ2Uge1xuICB2YXIgaW5kZXggPSBfc2ltcGxlQ2hhbmdlc0luZGV4KysgJSAyMDtcbiAgdmFyIHMgPSBfc2ltcGxlQ2hhbmdlc1tpbmRleF07XG4gIHMucHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVmFsdWU7XG4gIHMuY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlO1xuICByZXR1cm4gcztcbn1cblxuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25VdGlsIHtcbiAgc3RhdGljIHVuaW5pdGlhbGl6ZWQ6IE9iamVjdCA9IENPTlNUX0VYUFI8T2JqZWN0PihuZXcgT2JqZWN0KCkpO1xuXG4gIHN0YXRpYyBhcnJheUZuMCgpOiBhbnlbXSB7IHJldHVybiBbXTsgfVxuICBzdGF0aWMgYXJyYXlGbjEoYTEpOiBhbnlbXSB7IHJldHVybiBbYTFdOyB9XG4gIHN0YXRpYyBhcnJheUZuMihhMSwgYTIpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyXTsgfVxuICBzdGF0aWMgYXJyYXlGbjMoYTEsIGEyLCBhMyk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzXTsgfVxuICBzdGF0aWMgYXJyYXlGbjQoYTEsIGEyLCBhMywgYTQpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTRdOyB9XG4gIHN0YXRpYyBhcnJheUZuNShhMSwgYTIsIGEzLCBhNCwgYTUpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1XTsgfVxuICBzdGF0aWMgYXJyYXlGbjYoYTEsIGEyLCBhMywgYTQsIGE1LCBhNik6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2XTsgfVxuICBzdGF0aWMgYXJyYXlGbjcoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddOyB9XG4gIHN0YXRpYyBhcnJheUZuOChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdO1xuICB9XG4gIHN0YXRpYyBhcnJheUZuOShhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTogYW55W10ge1xuICAgIHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOV07XG4gIH1cblxuICBzdGF0aWMgb3BlcmF0aW9uX25lZ2F0ZSh2YWx1ZSk6IGFueSB7IHJldHVybiAhdmFsdWU7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9hZGQobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCArIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fc3VidHJhY3QobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAtIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbXVsdGlwbHkobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAqIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZGl2aWRlKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgLyByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX3JlbWFpbmRlcihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICUgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA9PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2lkZW50aWNhbChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID09PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9pZGVudGljYWwobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPT0gcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9sZXNzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZ3JlYXRlcl90aGVuKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgPiByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2xlc3Nfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2dyZWF0ZXJfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA+PSByaWdodDsgfVxuICBzdGF0aWMgY29uZChjb25kLCB0cnVlVmFsLCBmYWxzZVZhbCk6IGFueSB7IHJldHVybiBjb25kID8gdHJ1ZVZhbCA6IGZhbHNlVmFsOyB9XG5cbiAgc3RhdGljIG1hcEZuKGtleXM6IGFueVtdKTogYW55IHtcbiAgICBmdW5jdGlvbiBidWlsZE1hcCh2YWx1ZXMpOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSB7XG4gICAgICB2YXIgcmVzID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChyZXMsIGtleXNbaV0sIHZhbHVlc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuICgpID0+IFtdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gKGExKSA9PiBidWlsZE1hcChbYTFdKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIpID0+IGJ1aWxkTWFwKFthMSwgYTJdKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzKSA9PiBidWlsZE1hcChbYTEsIGEyLCBhM10pO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTRdKTtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTVdKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNl0pO1xuICAgICAgY2FzZSA3OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddKTtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdKTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSA9PlxuICAgICAgICAgICAgICAgICAgIGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5XSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgRG9lcyBub3Qgc3VwcG9ydCBsaXRlcmFsIG1hcHMgd2l0aCBtb3JlIHRoYW4gOSBlbGVtZW50c2ApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBrZXllZEFjY2VzcyhvYmosIGFyZ3MpOiBhbnkgeyByZXR1cm4gb2JqW2FyZ3NbMF1dOyB9XG5cbiAgc3RhdGljIHVud3JhcFZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdyYXBwZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLndyYXBwZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2hhbmdlRGV0ZWN0aW9uTW9kZShzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5KHN0cmF0ZWd5KSA/IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrQWx3YXlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlO1xuICB9XG5cbiAgc3RhdGljIHNpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlOiBhbnksIGN1cnJlbnRWYWx1ZTogYW55KTogU2ltcGxlQ2hhbmdlIHtcbiAgICByZXR1cm4gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsdWVCbGFuayh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBpc0JsYW5rKHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBzKHZhbHVlOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSA/IGAke3ZhbHVlfWAgOiAnJzsgfVxuXG4gIHN0YXRpYyBwcm90b0J5SW5kZXgocHJvdG9zOiBQcm90b1JlY29yZFtdLCBzZWxmSW5kZXg6IG51bWJlcik6IFByb3RvUmVjb3JkIHtcbiAgICByZXR1cm4gc2VsZkluZGV4IDwgMSA/XG4gICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgIHByb3Rvc1tzZWxmSW5kZXggLSAxXTsgIC8vIHNlbGYgaW5kZXggaXMgc2hpZnRlZCBieSBvbmUgYmVjYXVzZSBvZiBjb250ZXh0XG4gIH1cblxuICBzdGF0aWMgY2FsbFBpcGVPbkRlc3Ryb3koc2VsZWN0ZWRQaXBlOiBTZWxlY3RlZFBpcGUpOiB2b2lkIHtcbiAgICBpZiAoaW1wbGVtZW50c09uRGVzdHJveShzZWxlY3RlZFBpcGUucGlwZSkpIHtcbiAgICAgICg8YW55PnNlbGVjdGVkUGlwZS5waXBlKS5uZ09uRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBiaW5kaW5nVGFyZ2V0KG1vZGU6IHN0cmluZywgZWxlbWVudEluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZywgdW5pdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zzogc3RyaW5nKTogQmluZGluZ1RhcmdldCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nVGFyZ2V0KG1vZGUsIGVsZW1lbnRJbmRleCwgbmFtZSwgdW5pdCwgZGVidWcpO1xuICB9XG5cbiAgc3RhdGljIGRpcmVjdGl2ZUluZGV4KGVsZW1lbnRJbmRleDogbnVtYmVyLCBkaXJlY3RpdmVJbmRleDogbnVtYmVyKTogRGlyZWN0aXZlSW5kZXgge1xuICAgIHJldHVybiBuZXcgRGlyZWN0aXZlSW5kZXgoZWxlbWVudEluZGV4LCBkaXJlY3RpdmVJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgbG9vc2VOb3RJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuICFsb29zZUlkZW50aWNhbChhLCBiKTsgfVxuXG4gIHN0YXRpYyBkZXZNb2RlRXF1YWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoaXNMaXN0TGlrZUl0ZXJhYmxlKGEpICYmIGlzTGlzdExpa2VJdGVyYWJsZShiKSkge1xuICAgICAgcmV0dXJuIGFyZUl0ZXJhYmxlc0VxdWFsKGEsIGIsIENoYW5nZURldGVjdGlvblV0aWwuZGV2TW9kZUVxdWFsKTtcblxuICAgIH0gZWxzZSBpZiAoIWlzTGlzdExpa2VJdGVyYWJsZShhKSAmJiAhaXNQcmltaXRpdmUoYSkgJiYgIWlzTGlzdExpa2VJdGVyYWJsZShiKSAmJlxuICAgICAgICAgICAgICAgIWlzUHJpbWl0aXZlKGIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9vc2VJZGVudGljYWwoYSwgYik7XG4gICAgfVxuICB9XG59XG4iXX0=