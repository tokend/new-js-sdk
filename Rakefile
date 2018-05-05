require 'bundler'
Bundler.setup()

namespace :xdr do

  task :update => [:generate]

  task :generate do
    require "pathname"
    require "xdrgen"

    paths = Pathname.glob("xdr/**/*.x")
    compilation = Xdrgen::Compilation.new(
      paths,
      output_dir: "src/base/generated",
      namespace:  "xdr",
      language:   :javascript
    )
    compilation.compile
  end
end
