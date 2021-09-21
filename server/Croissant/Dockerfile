FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Croissant/Croissant.csproj", "Croissant/"]
RUN dotnet restore "Croissant/Croissant.csproj"
COPY . .
WORKDIR "/src/Croissant"
RUN dotnet build "Croissant.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Croissant.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Croissant.dll"]
