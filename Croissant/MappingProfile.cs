using AutoMapper;
using Entities.DataTransferObject;
using Entities.Models;

namespace Croissant
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<PostForCreationDto, Post>();
        }
    }
}