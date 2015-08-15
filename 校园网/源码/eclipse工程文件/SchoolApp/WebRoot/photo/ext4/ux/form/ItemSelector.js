Ext.define("Ext.ux.form.ItemSelector",{extend:"Ext.ux.form.MultiSelect",alias:["widget.itemselectorfield","widget.itemselector"],alternateClassName:["Ext.ux.ItemSelector"],requires:["Ext.ux.layout.component.form.ItemSelector","Ext.button.Button"],hideNavIcons:false,buttons:["top","up","add","remove","down","bottom"],buttonsText:{top:"Move to Top",up:"Move Up",add:"Add to Selected",remove:"Remove from Selected",down:"Move Down",bottom:"Move to Bottom"},multiselects:[],componentLayout:"itemselectorfield",fieldBodyCls:Ext.baseCSSPrefix+"form-itemselector-body",bindStore:function(b,c){var d=this,a=d.toField,f=d.fromField,e;d.callParent(arguments);if(a){a.store.removeAll();f.store.removeAll();e=[];d.store.each(function(g){e.push(g.copy(g.getId()))});f.store.add(e)}},onRender:function(e,c){var k=this,b=Ext.baseCSSPrefix,f="ItemSelectorDD-"+Ext.id(),d={displayField:k.displayField,valueField:k.valueField,dragGroup:f,dropGroup:f,flex:1,hideLabel:true},j=Ext.apply({listTitle:"Available",store:Ext.create("Ext.data.Store",{model:k.store.model}),listeners:{boundList:{itemdblclick:k.onItemDblClick,scope:k}}},k.multiselects[0],d),h=Ext.apply({listTitle:"Selected",store:Ext.create("Ext.data.Store",{model:k.store.model}),listeners:{boundList:{itemdblclick:k.onItemDblClick,scope:k},change:k.onToFieldChange,scope:k}},k.multiselects[1],d),l=Ext.widget("multiselect",j),g=Ext.widget("multiselect",h),a,i=[];Ext.ux.form.MultiSelect.superclass.onRender.call(k,e,c);k.fromField=l;k.toField=g;if(!k.hideNavIcons){Ext.Array.forEach(k.buttons,function(m){i.push({xtype:"button",tooltip:k.buttonsText[m],handler:k["on"+Ext.String.capitalize(m)+"BtnClick"],cls:b+"form-itemselector-btn",iconCls:b+"form-itemselector-"+m,scope:k});i.push({xtype:"component",height:3,width:1,style:"font-size:0;line-height:0"})})}a=k.innerCt=Ext.widget("container",{renderTo:k.bodyEl,layout:{type:"hbox",align:"middle"},items:[k.fromField,{xtype:"container",margins:"0 4",items:i},k.toField]});a.ownerCt=k;k.bindStore(k.store);k.setRawValue(k.rawValue)},onToFieldChange:function(){this.checkChange()},getSelections:function(e){var b=e.getStore(),d=e.getSelectionModel().getSelection(),c=0,a=d.length;return Ext.Array.sort(d,function(g,f){g=b.indexOf(g);f=b.indexOf(f);if(g<f){return -1}else{if(g>f){return 1}}return 0})},onTopBtnClick:function(){var e=this.toField.boundList,a=e.getStore(),d=this.getSelections(e),b=d.length-1,c;a.suspendEvents();for(;b>-1;--b){c=d[b];a.remove(d);a.insert(0,d)}a.resumeEvents();e.refresh()},onBottomBtnClick:function(){var f=this.toField.boundList,b=f.getStore(),e=this.getSelections(f),c=0,a=e.length,d;b.suspendEvents();for(;c<a;++c){d=e[c];b.remove(d);b.add(d)}b.resumeEvents();f.refresh()},onUpBtnClick:function(){var g=this.toField.boundList,b=g.getStore(),f=this.getSelections(g),d=0,a=f.length,e,c;b.suspendEvents();for(;d<a;++d){e=f[d];c=Math.max(0,b.indexOf(e)-1);b.remove(e);b.insert(c,e)}b.resumeEvents();g.refresh()},onDownBtnClick:function(){var h=this.toField.boundList,c=h.getStore(),g=this.getSelections(h),e=0,b=g.length,a=c.getCount(),f,d;c.suspendEvents();for(;e<b;++e){f=g[e];d=Math.min(a,c.indexOf(f)+1);c.remove(f);c.insert(d,f)}c.resumeEvents();h.refresh()},onAddBtnClick:function(){var b=this,c=b.fromField.boundList,a=this.getSelections(c);c.getStore().remove(a);this.toField.boundList.getStore().add(a)},onRemoveBtnClick:function(){var c=this,b=c.toField.boundList,a=this.getSelections(b);b.getStore().remove(a);this.fromField.boundList.getStore().add(a)},onItemDblClick:function(a){var b=this;if(a==b.toField.boundList){b.onRemoveBtnClick()}else{if(a==b.fromField.boundList){b.onAddBtnClick()}}},setRawValue:function(e){var c=this,b=Ext.Array,d,a,f;e=b.from(e);c.rawValue=e;if(c.toField){d=c.toField.boundList.getStore();a=c.fromField.boundList.getStore();a.add(d.getRange());d.removeAll();f=[];Ext.Array.forEach(e,function(i){var h,g=a.findRecord(c.valueField,i,h,h,true,true);if(g){f.push(g)}});a.remove(f);d.add(f)}return e},getRawValue:function(){var b=this,a=b.toField,c=b.rawValue;if(a){c=Ext.Array.map(a.boundList.getStore().getRange(),function(d){return d.get(b.valueField)})}b.rawValue=c;return c},updateReadOnly:function(){var a=this,b=a.readOnly||a.disabled;if(a.rendered){a.toField.setReadOnly(b);a.fromField.setReadOnly(b);Ext.Array.forEach(a.innerCt.query("button"),function(c){c.setDisabled(b)})}},onDestroy:function(){Ext.destroyMembers(this,"innerCt");this.callParent()}});