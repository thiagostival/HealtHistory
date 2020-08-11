import { container } from 'tsyringe';

import IFabricProvider from './Fabric/models/IFabricProvider';
import FabricProvider from './Fabric/implementations/FabricProvider';

container.registerSingleton<IFabricProvider>('FabricProvider', FabricProvider);
