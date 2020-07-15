using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PocoCrdb.DataAccess;

namespace PocoCrdb.Controllers
{
    [EnableCors("AppPolicy")]
    [Produces("application/json")]
    [Route("api/Poco/[action]")]
    [ApiController]
    public class PocoController : ControllerBase
    {
        public DataStore.Database db = new DataStore.Database();

        [HttpGet]
        public IEnumerable<Account> GetAll()
        {
            return db.GetAll();
        }

        [HttpPost]
        public Account GetSingle([FromBody] string id)
        {
            return db.GetSingle(id);
        }

        [HttpPost]
        public void Insert([FromBody] AccountDto account)
        {
            db.Insert(new Account()
            {
                Id = Guid.NewGuid(),
                AccountOwner = account.AccountOwner,
                Balance = account.Balance,
                DateCreated = account.DateCreated,
                LastUpdated = account.LastUpdated
            });
        }

        [HttpPost("{id}")]
        public void Update(string id, [FromBody] Account account)
        {
            db.Update(id, account);
        }

        [HttpPost("{id}")]
        public void Upsert(string id, [FromBody] Account account)
        {
            db.Upsert(id, account);
        }

        [HttpPost("{id}")]
        public void UpdateSnapshot(string id, [FromBody] Account account)
        {
            db.UpdateWithSnapshot(id, account);
        }

        [HttpPost("{id}")]
        public void UpdateMany(string id, [FromBody] Account account)
        {
            db.UpdateManyTrick(id, account);
        }

        [HttpPost]
        public void Remove([FromBody] Account account)
        {
            //var account = new Account()
            //{
            //    Id = new Guid(id)
            //};

            db.Remove(account);
        }

        [HttpGet]
        public void ComplexQuery()
        {
            db.ComplicatedQueryExecution();
        }
    }
}