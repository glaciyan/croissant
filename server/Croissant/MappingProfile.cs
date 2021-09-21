using AutoMapper;
using Entities.DataTransferObject;
using Entities.Models;

namespace Croissant
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Post
            CreateMap<Post, PostDto>();
            CreateMap<PostForCreationDto, Post>();
            CreateMap<PostForUpdateDto, Post>();

            // User
            CreateMap<UserForRegistrationDto, User>();
        }
    }
}