using System;

namespace Quickstart.Models
{
    public class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Saying { get; set; }

        public Hero()
        {
        }

        public Hero(int id, string name, string saying)
        {
            Id = id;
            Name = name;
            Saying = saying;
        }
    }
}
