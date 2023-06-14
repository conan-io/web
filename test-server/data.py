options_md = '''
# Options

{
'generators': ['cmake', 'cmake_find_package_multi'],
'settings': ['os', 'arch', 'compiler', 'build_type'],
'options': {
        'shared': [True, False],
        'fPIC': [True, False],
        'cmd': [True, False],
        'wav': [True, False],
        'flac': [True, False],
        'mpg123': [True, False],
        'mad': [True, False],
        'ogg': [True, False],
        'opus': [True, False],
        'mikmod': [True, False],
        'modplug': [True, False],
        'fluidsynth': [True, False],
        'nativemidi': [True, False],
        'tinymidi': [True, False]
    },
    'default_options': {
        'shared': False,
        'fPIC': True,
        'cmd': False,
        'wav': True,
        'flac': True,
        'mpg123': True,
        'mad': True,
        'ogg': True,
        'opus': True,
        'mikmod': True,
        'modplug': True,
        'fluidsynth': False,
        'nativemidi': True,
        'tinymidi': True
    },
}
'''


packages_md = '''
# Packages

{
'windows': {
    'x86_64': ['Visual Studio', 'clang'],
},
'mac': {
    'x86_64': ['clang', 'apple-clang'],
    'x86': ['clang', 'apple-clang']
},
'linux': {
    'x86_64': ['gcc', 'clang',],
    'x86': ['gcc', 'clang',],
    'arm': ['gcc', 'clang',],
},
}
'''

shields_io_md = '''
# shields.io badges

![Conan Center](https://img.shields.io/conan/v/opengl)

**Copy Markdown** `![Conan Center](https://img.shields.io/conan/v/opengl)`

**Copy reStructuredText** `.. image:: https://img.shields.io/conan/v/opengl   :alt: Conan Center`

**Copy AsciiDoc** `image:https://img.shields.io/conan/v/opengl[Conan Center]`

**copy HTML** `<img alt="Conan Center" src="https://img.shields.io/conan/v/opengl">`
'''


md_example = '''
    #include <iostream>
    using namespace std;

    int main()
    {
        int n, range;

        cout << "Enter an integer: ";
        cin >> n;

        cout << "Enter range: ";
        cin >> range;

        for (int i = 1; i <= range; ++i) {
            cout << n << " * " << i << " = " << n * i << endl;
        }

        return 0;
    }
'''


md_use_it = """
# googleapis/cci.20210730
---

## googleapis/cci.20210730 dependencies

* [protobuf/3.21.9](https://conan.io/center/protobuf)
* [zlib/1.2.13](https://conan.io/center/zlib)


## googleapis/cci.20210730 tools dependencies

* [cmake/3.25.3](https://conan.io/center/cmake)

## Using the googleapis Conan Package

Conan integrates with different build systems. You can declare which build system you want your project to use setting in the **[generators]** section of the [conanfile.txt](https://docs.conan.io/2/reference/conanfile_txt.html#generators) or using the **generators** attribute in the [conanfile.py](https://docs.conan.io/2/reference/conanfile/attributes.html#generators). Here, there is some basic information you can use to integrate **googleapis** in your own project. For more detailed information, please [check the Conan documentation](https://docs.conan.io/2/tutorial/consuming_packages.html).


## Using googleapis with CMake

### [Conan CMake generators](https://docs.conan.io/2/reference/tools/cmake.html)

* [CMakeDeps](https://docs.conan.io/2/reference/tools/cmake/cmakedeps.html): generates information about where the **googleapis** library and its dependencies  ( [protobuf](https://conan.io/center/protobuf),  [zlib](https://conan.io/center/zlib)) are installed together with other information like version, flags, and directory data or configuration. CMake will use this files when you invoke ``find_package()`` in your *CMakeLists.txt*.
* [CMakeToolchain](https://docs.conan.io/2/reference/tools/cmake/cmaketoolchain.html): generates a CMake toolchain file that you can later invoke with CMake in the command line using `-DCMAKE_TOOLCHAIN_FILE=conantoolchain.cmake`.
Declare these generators in your **conanfile.txt** along with your **googleapis** dependency like:
```ini
[requires]
googleapis/cci.20210730
[generators]
CMakeDeps
CMakeToolchain
```

To use **googleapis** in a simple CMake project with this structure:
```shell
.
|-- CMakeLists.txt
|-- conanfile.txt
|-- main.cpp
```

Your **CMakeLists.txt** could look similar to this, using the global **googleapis::googleapis** CMake's target:
```cmake
cmake_minimum_required(VERSION 3.15)
project(googleapis_project CXX)
find_package(googleapis)
add_executable(${PROJECT_NAME} main.cpp)
# Use the global target
target_link_libraries(${PROJECT_NAME} googleapis::googleapis)
```

To install **googleapis/cci.20210730**, its dependencies and build your project, you just have to do:
```shell
# for Linux/macOS
$ conan install . --install-folder cmake-build-release --build=missing
$ cmake . -DCMAKE_TOOLCHAIN_FILE=cmake-build-release/conan_toolchain.cmake -DCMAKE_BUILD_TYPE=Release
$ cmake --build .
# for Windows and Visual Studio 2017
$ conan install . --output-folder cmake-build --build=missing
$ cmake . -G "Visual Studio 15 2017" -DCMAKE_TOOLCHAIN_FILE=cmake-build/conan_toolchain.cmake
$ cmake --build . --config Release
```



As the googleapis Conan package defines components, you can link only the desired parts of the library in your project. For example, linking only with the googleapis **google_maps_roads_v1op_roads_proto** component, through the **googleapis::google_maps_roads_v1op_roads_proto** target.

```cmake
...
# Link just to googleapis's component: google_maps_roads_v1op_roads_proto
target_link_libraries(${PROJECT_NAME} googleapis::google_maps_roads_v1op_roads_proto)
```

To check all the available components for **googleapis** Conan package, please check the dedicated section at the end of this document.




## Using googleapis with Autotools and pkg-config

### [Autotools Conan generators](https://docs.conan.io/2/reference/tools/gnu.html)

* [AutotoolsToolchain](https://docs.conan.io/2/reference/tools/gnu/autotoolstoolchain.html): generates the **conanautotoolstoolchain.sh/bat** script translating information from the current package configuration, settings, and options setting some enviroment variables for Autotools like: ``CPPFLAGS``, ``CXXFLAGS``, ``CFLAGS`` and ``LDFLAGS``. It will also generate a ``deactivate_conanautotoolstoolchain.sh/bat`` so you can restore your environment.
* [PkgConfigDeps](https://docs.conan.io/2/reference/tools/gnu/pkgconfigdeps.html#pkgconfigdeps): generates the **googleapis.pc** file (and the ones corresponding to **googleapis** dependencies) with information about the dependencies that can be later used by the **pkg-config** tool pkg-config to collect data about the libraries Conan installed.

Declare these generators in your **conanfile.txt** along with your **googleapis** dependency like:

```ini
[requires]
googleapis/cci.20210730
[generators]
AutotoolsToolchain
PkgConfigDeps
```

To use **googleapis** in a simple Autotools project with this structure:
```shell
.
|-- configure.ac
|-- Makefile.am
|-- conanfile.txt
|-- main.cpp
```

Your **Makefile.am**/**configure.ac** could look similar to this, using the global **googleapis** pkg-config target:

**Makefile.am**
```makefile
bin_PROGRAMS = main
main_SOURCES = main.cpp
AM_CXXFLAGS = $(googleapis_CFLAGS)
main_LDADD = $(googleapis_LIBS)
```

**configure.ac**
```
AC_INIT([main], [1.0], [])
AM_INIT_AUTOMAKE([-Wall -Werror foreign])
AC_PROG_CXX
PKG_PROG_PKG_CONFIG
PKG_CHECK_MODULES([googleapis], [googleapis >= cci.20210730])
AC_CONFIG_FILES([Makefile])
AC_OUTPUT
```

And then using **autoreconf** and **make** to build your executable:

```shell
$ conan install .
# set the environment variables for Autotools
$ source conanautotoolstoolchain.sh
$ autoreconf --force --install
$ ./configure
$ make
# restore the environment after the build is completed
$ source deactivate_conanautotoolstoolchain.sh
```


As the googleapis Conan package defines components you can use them to link only that desired part of the library in your project.  To check all the available components for **googleapis** Conan package, and the corresponding *.pc* files names, please check the dedicated section at the end of this document.


## Using googleapis with Visual Studio

### [Visual Studio Conan generators](https://docs.conan.io/2/reference/tools/microsoft.html)

* [MSBuildDeps](https://docs.conan.io/2/reference/tools/microsoft/msbuilddeps.html): generates the **conandeps.props** properties file with information about where the **googleapis** library and its dependencies  ( [protobuf](https://conan.io/center/protobuf),  [zlib](https://conan.io/center/zlib)) are installed together with other information like version, flags, and directory data or configuration.
* [MSBuildToolchain](https://docs.conan.io/2/reference/tools/microsoft/msbuildtoolchain.html): Generates the **conantoolchain.props** properties file with the current package configuration, settings, and options.
Declare these generators in your **conanfile.txt** along with your **googleapis** dependency like:
```ini
[requires]
googleapis/cci.20210730
[generators]
MSBuildDeps
MSBuildToolchain
```

To create all the *xxxx.props* files, simply run:

```shell
$ conan install .
```

Take into account you need to have Visual Studio IDE or MSBuild Engine in your system if you want to inject those files.

Please, check the following Conan documentation sections for more detailed information:
* [Visual Studio integrations with Conan](https://docs.conan.io/2/integrations/visual_studio.html).
* [Conan Microsoft tools](https://docs.conan.io/2/reference/tools/microsoft.html#conan-tools-microsoft).


## Other build systems

Please, [check the Conan documentation](https://docs.conan.io/2/reference/tools.html) for other integrations besides the ones listed in this document.



## Declared components for googleapis

These are all the declared components for the **googleapis** Conan package:
* Component **google_maps_roads_v1op_roads_proto**:
  * CMake target name: ``googleapis::google_maps_roads_v1op_roads_proto``
  * pkg-config *.pc* file: **google_maps_roads_v1op_roads_proto.pc**
  * Requires other components: **google_api_client_proto**, **protobuf::libprotobuf**, **google_api_annotations_proto**, **google_api_resource_proto**, **google_type_latlng_proto**
  * Links to libraries: **google_maps_roads_v1op_roads_proto**
* Component **google_maps_roads_v1op_roads_cc_proto**:
  * CMake target name: ``googleapis::google_maps_roads_v1op_roads_cc_proto``
  * pkg-config *.pc* file: **google_maps_roads_v1op_roads_cc_proto.pc**
  * Requires other components: **google_maps_roads_v1op_roads_proto**, **protobuf::libprotobuf**
* Component **google_maps_routes_v1_routes_proto**:
  * CMake target name: ``googleapis::google_maps_routes_v1_routes_proto``
  * pkg-config *.pc* file: **google_maps_routes_v1_routes_proto.pc**
  * Requires other components: **google_api_client_proto**, **google_geo_type_viewport_proto**, **protobuf::libprotobuf**, **google_rpc_status_proto**, **google_api_annotations_proto**, **google_type_money_proto**, **google_api_field_behavior_proto**, **google_type_latlng_proto**
  * Links to libraries: **google_maps_routes_v1_routes_proto**
* Component **google_maps_routes_v1_routes_cc_proto**:
  * CMake target name: ``googleapis::google_maps_routes_v1_routes_cc_proto``
  * pkg-config *.pc* file: **google_maps_routes_v1_routes_cc_proto.pc**
  * Requires other components: **google_maps_routes_v1_routes_proto**, **protobuf::libprotobuf**
* Component **google_bigtable_admin_v2_admin_proto**:
  * CMake target name: ``googleapis::google_bigtable_admin_v2_admin_proto``
  * pkg-config *.pc* file: **google_bigtable_admin_v2_admin_proto.pc**
  * Requires other components: **google_api_client_proto**, **google_iam_v1_iam_policy_proto**, **protobuf::libprotobuf**, **google_rpc_status_proto**, **google_api_annotations_proto**, **google_iam_v1_policy_proto**, **google_longrunning_operations_proto**, **google_api_field_behavior_proto**, **google_api_resource_proto**
  * Links to libraries: **google_bigtable_admin_v2_admin_proto**
* Component **google_bigtable_admin_v2_admin_cc_proto**:
  * CMake target name: ``googleapis::google_bigtable_admin_v2_admin_cc_proto``
  * pkg-config *.pc* file: **google_bigtable_admin_v2_admin_cc_proto.pc**
  * Requires other components: **google_bigtable_admin_v2_admin_proto**, **protobuf::libprotobuf**
* Component **google_bigtable_v2_bigtable_proto**:
  * CMake target name: ``googleapis::google_bigtable_v2_bigtable_proto``
  * pkg-config *.pc* file: **google_bigtable_v2_bigtable_proto.pc**
  * Requires other components: **google_api_client_proto**, **protobuf::libprotobuf**, **google_rpc_status_proto**, **google_api_annotations_proto**, **google_api_field_behavior_proto**, **google_api_resource_proto**
  * Links to libraries: **google_bigtable_v2_bigtable_proto**

## Exposed header files for googleapis

```cpp
#include <google/maps/roads/v1op/roads.pb.h>
#include <google/maps/routes/v1/custom_route.pb.h>
#include <google/maps/routes/v1/compute_custom_routes_response.pb.h>
#include <google/maps/routes/v1/compute_routes_request.pb.h>
#include <google/maps/routes/v1/waypoint.pb.h>
#include <google/maps/routes/v1/toll_passes.pb.h>
#include <google/maps/routes/v1/polyline.pb.h>
#include <google/maps/routes/v1/compute_route_matrix_request.pb.h>
#include <google/maps/routes/v1/vehicle_emission_type.pb.h>
#include <google/maps/routes/v1/route_matrix_element.pb.h>
#include <google/maps/routes/v1/compute_routes_response.pb.h>
#include <google/maps/routes/v1/fallback_info.pb.h>
#include <google/maps/routes/v1/compute_custom_routes_request.pb.h>
#include <google/maps/routes/v1/route_service.pb.h>
#include <google/maps/routes/v1/route.pb.h>
#include <google/bigtable/admin/v2/instance.pb.h>
#include <google/bigtable/admin/v2/common.pb.h>
#include <google/bigtable/admin/v2/bigtable_instance_admin.pb.h>
#include <google/bigtable/admin/v2/bigtable_table_admin.pb.h>
#include <google/bigtable/admin/v2/table.pb.h>
#include <google/bigtable/v2/bigtable.pb.h>
```


---
---
Conan **2.0.5**. JFrog LTD. [https://conan.io](https://conan.io). Autogenerated 2023-05-25 07:41:39.
"""
