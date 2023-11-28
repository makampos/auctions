using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        public AuctionsController(AuctionDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionDto>>> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                .Include(x => x.Item)
                .OrderBy(x => x.Item.Make)
                .ToListAsync();
            
            return Ok(_mapper.Map<IEnumerable<AuctionDto>>(auctions));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
        {
            var auction = await _context.Auctions.
                Include(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            return auction is null ? NotFound() : Ok(_mapper.Map<AuctionDto>(auction));
        }
        
        [HttpPost]
        public async Task<ActionResult<Guid>> CreateAuction(CreateAuctionDto createAuctionDto)
        {
            var auction = _mapper.Map<Auction>(createAuctionDto);
            
            _context.Auctions.Add(auction);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Could not create auction");

            return CreatedAtAction(nameof(GetAuctionById), new { id = auction.Id }, _mapper.Map<Auction>(auction));
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _context.Auctions.
                Include(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction is null) return NotFound();
            
            // Make better
            
            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;
            
            var result = await _context.SaveChangesAsync() > 0;

            return !result ? BadRequest("Could not update auction") : NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction = await _context.Auctions.FirstOrDefaultAsync(x => x.Id == id);

            if (auction is null) return NotFound();

            _context.Auctions.Remove(auction);
            
            var result = await _context.SaveChangesAsync() > 0;

            return !result ? BadRequest("Could not delete auction") : NoContent();
        }
    }
}