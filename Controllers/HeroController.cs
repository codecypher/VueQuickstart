using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Quickstart.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Quickstart.Controllers
{
    [Route("api/[controller]")]
    public class HeroController : Controller
    {
        private static int Next = 40;

        private static List<Hero> heroes = new List<Hero> {
            new Hero { Id = 10, Name = "Bilbo Baggins", Saying = "Learn Vue" },
            new Hero { Id = 20, Name = "Hans Sven", Saying = "Another Item 1" },
            new Hero { Id = 30, Name = "Bill Smith", Saying = "Another Item 2" }
        };

        // GET: api/hero
        [HttpGet]
        public IEnumerable<Hero> Get()
        {
            return heroes;
        }

        // GET api/hero/5
        [HttpGet("{id}")]
        public Hero Get(int id)
        {
            return heroes.FirstOrDefault(x => x.Id == id);
        }

        // POST api/hero
        [HttpPost]
        public Hero Post([FromBody]Hero hero)
        {
            hero.Id = Next++;
            heroes.Add(hero);
            return hero;
        }

        // PUT api/hero/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Hero hero)
        {
            var findHero = heroes.SingleOrDefault(t => t.Id == id);

            if (findHero == null) return NotFound();

            findHero.Name = hero.Name;
            findHero.Saying = hero.Saying;

            return StatusCode(200);
        }

        // DELETE api/hero/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var hero = heroes.SingleOrDefault(t => t.Id == id);

            if (hero == null) return NotFound();

            heroes.Remove(hero);

            return StatusCode(204);
        }
    }
}
