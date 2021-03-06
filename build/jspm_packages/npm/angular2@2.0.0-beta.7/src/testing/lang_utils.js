/* */ 
'use strict';function getTypeOf(instance) {
    return instance.constructor;
}
exports.getTypeOf = getTypeOf;
function instantiateType(type, params) {
    if (params === void 0) { params = []; }
    var instance = Object.create(type.prototype);
    instance.constructor.apply(instance, params);
    return instance;
}
exports.instantiateType = instantiateType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy90ZXN0aW5nL2xhbmdfdXRpbHMudHMiXSwibmFtZXMiOlsiZ2V0VHlwZU9mIiwiaW5zdGFudGlhdGVUeXBlIl0sIm1hcHBpbmdzIjoiQUFBQSxtQkFBMEIsUUFBUTtJQUNoQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7QUFDOUJBLENBQUNBO0FBRmUsaUJBQVMsWUFFeEIsQ0FBQTtBQUVELHlCQUFnQyxJQUFjLEVBQUUsTUFBa0I7SUFBbEJDLHNCQUFrQkEsR0FBbEJBLFdBQWtCQTtJQUNoRUEsSUFBSUEsUUFBUUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDN0NBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO0lBQzdDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtBQUNsQkEsQ0FBQ0E7QUFKZSx1QkFBZSxrQkFJOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlT2YoaW5zdGFuY2UpIHtcbiAgcmV0dXJuIGluc3RhbmNlLmNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVUeXBlKHR5cGU6IEZ1bmN0aW9uLCBwYXJhbXM6IGFueVtdID0gW10pIHtcbiAgdmFyIGluc3RhbmNlID0gT2JqZWN0LmNyZWF0ZSh0eXBlLnByb3RvdHlwZSk7XG4gIGluc3RhbmNlLmNvbnN0cnVjdG9yLmFwcGx5KGluc3RhbmNlLCBwYXJhbXMpO1xuICByZXR1cm4gaW5zdGFuY2U7XG59XG4iXX0=