class AServerGameModeMain: AInherited
{


  UPROPERTY(DefaultComponent, meta = (SomeKey = SomeValue, AnotherKey ="Someliteral"))
  USidecarInterfaceProd Sidecar;

  default Sidecar.bShouldAutoConnect = false;
	default Tags.Add(n"ExampleTag");

  UPROPERTY(Config)
  FString SidecarUri;

  UFUNCTION(BlueprintOverride)
  void ConstructionScript() {
    Sidecar.AddressAndPort = SidecarUri;
    Sidecar.bShouldUseTLS = SidecarUri.StartsWith("https") || SidecarUri.StartsWith("wss");
  }

  UFUNCTION(BlueprintOverride)
  void BeginPlay() {
  }
}