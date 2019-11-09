using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Disposables;
using System.Reactive.Linq;
using System.Threading.Tasks;

namespace SignalRTest.Hubs
{
    public class ReactiveHub : Hub
    {
        public async Task<IObservable<int>> SendData()
        {
            //var myOnNext = Observer.Create<int>(onNext: i => ProduceRandomNumber());

            return Observable.Create<int>(observer => 
            {
                observer.OnNext(1);
                observer.OnNext(2);
                observer.OnCompleted();
                return Disposable.Empty;
            });
        }

        private int ProduceRandomNumber()
        {
            bool running = true;
            int count = 0;
            while (running)
            {
                count += 3;

                if (count > 100)
                {
                    running = false;
                    return count;
                }

                return count;
            }

            return -1;
        }
    }
}
