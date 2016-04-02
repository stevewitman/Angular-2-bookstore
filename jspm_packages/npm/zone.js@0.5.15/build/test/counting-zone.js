/* */ 
"format cjs";
'use strict';
var zone_1 = require('../lib/browser/zone');
describe('Zone.countingZone', function () {
    function makeCountingZone() {
        return global.zone.fork(zone_1.Zone.longStackTraceZone).
            fork(zone_1.Zone.countingZone);
    }
    it('should flush at the end of a run', function (done) {
        makeCountingZone().fork({
            onFlush: done
        }).run(function () { });
    });
    it('should work with setTimeout', function (done) {
        var countingZone = makeCountingZone();
        countingZone.run(function () {
            setTimeout(function () {
                expect(countingZone.counter()).toBe(0);
                done();
            }, 0);
            expect(countingZone.counter()).toBe(1);
        });
    });
    it('should work with clearTimeout', function () {
        var countingZone = makeCountingZone();
        makeCountingZone().run(function () {
            var id = setTimeout(function () { }, 0);
            expect(countingZone.counter()).toBe(1);
            clearTimeout(id);
            expect(countingZone.counter()).toBe(0);
        });
    });
    it('should work with setInterval', function (done) {
        var latch = 0;
        var countingZone = makeCountingZone();
        var id;
        countingZone.run(function () {
            expect(countingZone.counter()).toBe(0);
            id = setInterval(function () {
                latch++;
                ;
                // setInterval should run multiple times
                if (latch === 2) {
                    finish();
                }
            }, 0);
            expect(countingZone.counter()).toBe(1);
        });
        function finish() {
            expect(countingZone.counter()).toBe(1);
            clearInterval(id);
            done();
        }
    });
    it('should work with clearInterval', function () {
        var id;
        var latch = 0;
        var countingZone = makeCountingZone();
        countingZone.run(function () {
            id = setInterval(function () {
                latch++;
            }, 0);
            expect(countingZone.counter()).toBe(1);
            clearInterval(id);
            expect(countingZone.counter()).toBe(0);
        });
    });
    it('should work with addEventListener', function (done) {
        var countingZone = makeCountingZone();
        var elt = document.createElement('button');
        expect(countingZone.counter()).toBe(0);
        countingZone.run(main);
        function main() {
            expect(countingZone.counter()).toBe(0);
            elt.addEventListener('click', onClick);
            expect(countingZone.counter()).toBe(1);
            elt.click();
            function onClick() {
                expect(countingZone.counter()).toBe(1);
                elt.removeEventListener('click', onClick);
                expect(countingZone.counter()).toBe(0);
                done();
            }
            expect(countingZone.counter()).toBe(0);
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRpbmctem9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvY291bnRpbmctem9uZS50cyJdLCJuYW1lcyI6WyJtYWtlQ291bnRpbmdab25lIiwiZmluaXNoIiwibWFpbiIsIm1haW4ub25DbGljayJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IscUJBQW1CLHFCQUFxQixDQUFDLENBQUE7QUFFekMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzVCO1FBQ0VBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQU9BLFdBQUtBLENBQUNBLGtCQUFrQkEsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQU9BLFdBQUtBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQzdDQSxDQUFDQTtJQUVELEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxVQUFVLElBQUk7UUFDbkQsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFHSCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBVSxJQUFJO1FBQzlDLElBQUksWUFBWSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFDdEMsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUNmLFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUdI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LENBQUNBLENBQUNBO1lBQ3ZDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLENBQUNBLE9BQU9BLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO1lBQ3ZDQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV2Q0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDWkE7Z0JBQ0VDLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDMUNBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUV2Q0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDVEEsQ0FBQ0E7WUFFREQsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekNBLENBQUNBO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7Wm9uZX0gZnJvbSAnLi4vbGliL2Jyb3dzZXIvem9uZSc7XG5cbmRlc2NyaWJlKCdab25lLmNvdW50aW5nWm9uZScsIGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gbWFrZUNvdW50aW5nWm9uZSgpIHtcbiAgICByZXR1cm4gZ2xvYmFsLnpvbmUuZm9yaygoPGFueT5ab25lKS5sb25nU3RhY2tUcmFjZVpvbmUpLlxuICAgICAgICAgICAgICAgIGZvcmsoKDxhbnk+Wm9uZSkuY291bnRpbmdab25lKTtcbiAgfVxuXG4gIGl0KCdzaG91bGQgZmx1c2ggYXQgdGhlIGVuZCBvZiBhIHJ1bicsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgbWFrZUNvdW50aW5nWm9uZSgpLmZvcmsoe1xuICAgICAgb25GbHVzaDogZG9uZVxuICAgIH0pLnJ1bihmdW5jdGlvbiAoKSB7IH0pO1xuICB9KTtcblxuXG4gIGl0KCdzaG91bGQgd29yayB3aXRoIHNldFRpbWVvdXQnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBjb3VudGluZ1pvbmUgPSBtYWtlQ291bnRpbmdab25lKCk7XG4gICAgY291bnRpbmdab25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMCk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIDApO1xuICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMSk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggY2xlYXJUaW1lb3V0JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGluZ1pvbmUgPSBtYWtlQ291bnRpbmdab25lKCk7XG5cbiAgICBtYWtlQ291bnRpbmdab25lKCkucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge30sIDApO1xuICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMSk7XG4gICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMCk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggc2V0SW50ZXJ2YWwnLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBsYXRjaCA9IDA7XG4gICAgdmFyIGNvdW50aW5nWm9uZSA9IG1ha2VDb3VudGluZ1pvbmUoKTtcbiAgICB2YXIgaWQ7XG5cbiAgICBjb3VudGluZ1pvbmUucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDApO1xuXG4gICAgICBpZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGF0Y2grKzs7XG5cbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwgc2hvdWxkIHJ1biBtdWx0aXBsZSB0aW1lc1xuICAgICAgICBpZiAobGF0Y2ggPT09IDIpIHtcbiAgICAgICAgICBmaW5pc2goKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG5cbiAgICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMSk7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICAgIGRvbmUoKTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggY2xlYXJJbnRlcnZhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIGxhdGNoID0gMDtcbiAgICB2YXIgY291bnRpbmdab25lID0gbWFrZUNvdW50aW5nWm9uZSgpO1xuXG4gICAgY291bnRpbmdab25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICBpZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGF0Y2grKztcbiAgICAgIH0sIDApO1xuICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMSk7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDApO1xuICAgIH0pO1xuICB9KTtcblxuXG4gIGl0KCdzaG91bGQgd29yayB3aXRoIGFkZEV2ZW50TGlzdGVuZXInLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBjb3VudGluZ1pvbmUgPSBtYWtlQ291bnRpbmdab25lKCk7XG4gICAgdmFyIGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDApO1xuICAgIGNvdW50aW5nWm9uZS5ydW4obWFpbik7XG5cbiAgICBmdW5jdGlvbiBtYWluICgpIHtcbiAgICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDApO1xuICAgICAgZWx0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG4gICAgICBleHBlY3QoY291bnRpbmdab25lLmNvdW50ZXIoKSkudG9CZSgxKTtcblxuICAgICAgZWx0LmNsaWNrKCk7XG4gICAgICBmdW5jdGlvbiBvbkNsaWNrICgpIHtcbiAgICAgICAgZXhwZWN0KGNvdW50aW5nWm9uZS5jb3VudGVyKCkpLnRvQmUoMSk7XG4gICAgICAgIGVsdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuICAgICAgICBleHBlY3QoY291bnRpbmdab25lLmNvdW50ZXIoKSkudG9CZSgwKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9XG5cbiAgICAgIGV4cGVjdChjb3VudGluZ1pvbmUuY291bnRlcigpKS50b0JlKDApO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==