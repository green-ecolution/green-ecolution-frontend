# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Route preview added (#324).
- Preview route in dashboard (#357).
- Overview of all users (#336).
- Overview and single view for sensors (#261).
- Overview and management of vehicles (#265).
- Create, update, and delete views for watering plans (#299, #281, #311).
- Base architecture for plugins in the frontend (#243).
- Error page for better handling of issues (#288).

### Changed
- Show correct data in the "Own Profile" view (#320).
- Display real sensor data on the single tree view (#314).
- Show tree number in tooltip on hover (#180).
- Highlight selected tree when navigating from tree view to the map (#181).
- Add information message if no vehicle is selected during route generation (#338).
- Add weight field to vehicle views (edit/create forms) (#326).
- Improve design of the "Add Tree" form (#220).
- Update view after CSV import (#235).
- Refactor detailed lists for improved readability (#286).
- Wording update: Renamed "Baumkataster" (#258).

### Fixed
- Single tree view error resolved (#349).
- Tree cluster view not updating properly (#342).
- Tree clusters without a region are now visible on the map (#252).
- Empty tree clusters on the map no longer display as "0" (#252).
- Double-clicking filters no longer moves the map (#218).
- Save JWT token to prevent authentication state issues (#182).
- CSV files recognized as MS-Excel in Windows + Firefox (#237).

### Removed
- Removed unused `shadcn` classes and updated info view (#293).


## [v1.0.0] - 2024-10-22

### Added

- Initial release
- Implement CI/CD and GitHub Pipeline
- User authentication (#34)
- Add breadcrumb to header (#29)
- Add favicons (#93)
- Implement corporate design (#28)
- Add startpage
- Display tree clusters and trees on map (#3, #143, #69)
- Added zoom buttons to map (#52)
- Create view for tree cluster (#33)
- Add single view for tree cluster (#48)
- Implement function to delete a treecluster (#130)
- Add treecluster description (#145)
- Add treecluster filter (#40)
- Create and update tree (#126)
- Implement function to delete a tree (#144)
- Show tree watering status on map (#132)
- Create tree on map (#76)
- Add view for single tree (#71)
- Add function to select trees in forms (#57)
- Get tree region from backend (#60)
- Implement database import from CSV (#55)

### Changed

[Unreleased]: https://github.com/green-ecolution/green-ecolution-frontend/compare/v1.0.0...HEAD
[v1.0.0]: https://github.com/green-ecolution/green-ecolution-frontend/compare/c0b0e1...v1.0.0
