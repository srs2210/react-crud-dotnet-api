using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class DonationDbContext:DbContext
    {
        public DonationDbContext(DbContextOptions<DonationDbContext> options):base(options)
        {

        }

        public DbSet<DCandidate> DCandidates { get; set; }

    }
}
