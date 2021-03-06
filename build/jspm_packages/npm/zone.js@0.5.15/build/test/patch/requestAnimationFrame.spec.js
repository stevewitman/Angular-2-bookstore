/* */ 
"format cjs";
var util_1 = require('../util');
describe('requestAnimationFrame', function () {
    var testZone = global.zone.fork();
    var functions = [
        'requestAnimationFrame',
        'webkitRequestAnimationFrame',
        'mozRequestAnimationFrame'
    ];
    functions.forEach(function (fnName) {
        describe(fnName, util_1.ifEnvSupports(fnName, function () {
            var rAF = window[fnName];
            it('should be tolerant of invalid arguments', function (done) {
                testZone.run(function () {
                    // rAF throws an error on invalid arguments, so expect that.
                    expect(function () {
                        rAF(null);
                    }).toThrow();
                    done();
                });
            });
            it('should bind to same zone when called recursively', function (done) {
                testZone.run(function () {
                    var frames = 0;
                    var previousTimeStamp = 0;
                    function frameCallback(timestamp) {
                        expect(global.zone).toBe(testZone);
                        expect(timestamp).toMatch(/^[\d.]+$/);
                        // expect previous <= current
                        expect(previousTimeStamp).not.toBeGreaterThan(timestamp);
                        previousTimeStamp = timestamp;
                        if (frames++ > 15) {
                            return done();
                        }
                        rAF(frameCallback);
                    }
                    rAF(frameCallback);
                });
            });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdEFuaW1hdGlvbkZyYW1lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0L3BhdGNoL3JlcXVlc3RBbmltYXRpb25GcmFtZS5zcGVjLnRzIl0sIm5hbWVzIjpbImZyYW1lQ2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBLHFCQUE0QixTQUFTLENBQUMsQ0FBQTtBQUV0QyxRQUFRLENBQUMsdUJBQXVCLEVBQUU7SUFDaEMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsQyxJQUFJLFNBQVMsR0FBRztRQUNkLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsMEJBQTBCO0tBQzNCLENBQUM7SUFFRixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsTUFBTTtRQUNoQyxRQUFRLENBQUMsTUFBTSxFQUFFLG9CQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV6QixFQUFFLENBQUMseUNBQXlDLEVBQUUsVUFBVSxJQUFJO2dCQUMxRCxRQUFRLENBQUMsR0FBRyxDQUFDO29CQUNYLDREQUE0RDtvQkFDNUQsTUFBTSxDQUFDO3dCQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDWixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDVCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLFVBQVUsSUFBSTtnQkFDbkUsUUFBUSxDQUFDLEdBQUcsQ0FBQztvQkFDWCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7b0JBRTFCLHVCQUF1QixTQUFTO3dCQUM5QkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7d0JBRW5DQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTt3QkFDdENBLDZCQUE2QkE7d0JBQzdCQSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO3dCQUN6REEsaUJBQWlCQSxHQUFHQSxTQUFTQSxDQUFDQTt3QkFFOUJBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzRCQUNsQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7d0JBQ2hCQSxDQUFDQTt3QkFDREEsR0FBR0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxDQUFDQTtvQkFFRCxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aWZFbnZTdXBwb3J0c30gZnJvbSAnLi4vdXRpbCc7XG5cbmRlc2NyaWJlKCdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0Wm9uZSA9IGdsb2JhbC56b25lLmZvcmsoKTtcblxuICB2YXIgZnVuY3Rpb25zID0gW1xuICAgICdyZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLFxuICAgICd3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnLFxuICAgICdtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXG4gIF07XG5cbiAgZnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGZuTmFtZSkge1xuICAgIGRlc2NyaWJlKGZuTmFtZSwgaWZFbnZTdXBwb3J0cyhmbk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByQUYgPSB3aW5kb3dbZm5OYW1lXTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSB0b2xlcmFudCBvZiBpbnZhbGlkIGFyZ3VtZW50cycsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgICAgIHRlc3Rab25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gckFGIHRocm93cyBhbiBlcnJvciBvbiBpbnZhbGlkIGFyZ3VtZW50cywgc28gZXhwZWN0IHRoYXQuXG4gICAgICAgICAgZXhwZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJBRihudWxsKTtcbiAgICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJpbmQgdG8gc2FtZSB6b25lIHdoZW4gY2FsbGVkIHJlY3Vyc2l2ZWx5JywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICAgdGVzdFpvbmUucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgZnJhbWVzID0gMDtcbiAgICAgICAgICB2YXIgcHJldmlvdXNUaW1lU3RhbXAgPSAwO1xuXG4gICAgICAgICAgZnVuY3Rpb24gZnJhbWVDYWxsYmFjayh0aW1lc3RhbXApIHtcbiAgICAgICAgICAgIGV4cGVjdChnbG9iYWwuem9uZSkudG9CZSh0ZXN0Wm9uZSk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh0aW1lc3RhbXApLnRvTWF0Y2goL15bXFxkLl0rJC8pO1xuICAgICAgICAgICAgLy8gZXhwZWN0IHByZXZpb3VzIDw9IGN1cnJlbnRcbiAgICAgICAgICAgIGV4cGVjdChwcmV2aW91c1RpbWVTdGFtcCkubm90LnRvQmVHcmVhdGVyVGhhbih0aW1lc3RhbXApO1xuICAgICAgICAgICAgcHJldmlvdXNUaW1lU3RhbXAgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgICAgIGlmIChmcmFtZXMrKyA+IDE1KSB7XG4gICAgICAgICAgICAgIHJldHVybiBkb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByQUYoZnJhbWVDYWxsYmFjayk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgckFGKGZyYW1lQ2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG59KTtcbiJdfQ==