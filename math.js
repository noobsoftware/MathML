app.elements.math = {
	init: function(element) {
		var branch = this;
		//console.log(branch);
		var item_reference = {
			id: element.id,
			definition_reference: element,
			$element: null,
			render: function(input) { //page_reference getur verid element_reference lika
				var self = this;
				var $container = null;
				//console.log('input', input);
				if(typeof input.page_reference !== 'undefined') {
					$container = input.page_reference.$element;
					self.page_reference = input.page_reference;
				}
				if(typeof input.$container !== 'undefined') {
					$container = input.$container;
				}
				var $item = $("\
	<button class='insert_node_before_button'>Insert node before</button>\
	<button class='insert_node_button'>Insert node after</button>\
	<button class='make_fraction_button'>Make fraction from node</button>\
	<button class='remove_fraction_button'>Remove fraction from node</button>\
	<div contenteditable='true' class='main_math_ml_editor'>\
		<math display='block' style='font-size:32px; min-height:100px; border:1px solid rgba(0,0,0,0.5); padding:10px; margin:10px;'><mi>0</mi></math></div>");
				$item.attr('id', element.id);
				if(typeof element.content !== 'undefined') {
					$item.html(element.content);
				}
				if(typeof element.template_target_selector !== 'undefined') {
					var $template_target = $container.find(element.template_target_selector).first();
					if(typeof element.ready_selector === 'undefined') {
						$template_target.html($item);
					} else {
						$item = $template_target;
					}
				} else if(typeof element.contained !== 'undefined') {
					$item = $container;
				} else {
					if(typeof input.wrap !== 'undefined') {
						$item = $container.children();
					} else {
						$container.append($item);
					}
				}
				self.$element = $item;
				if(typeof element.hidden !== 'undefined' && element.hidden) {
					$item.hide();
				}

				jQuery.fn.extend({getPath:function(){for(var t,i=this;i.length;){var e=i[0],a=e.localName;if(!a)break;a=a.toLowerCase();var n=i.parent();if(n.children(a).length>1){var l=n.children().index(e)+1;l>1&&(a+=":nth-child("+l+")")}t=a+(t?">"+t:""),i=n}return t}});

				var editor = {
					get_offset: function(editableDiv) {
					    /*var sel = document.getSelection();
					    sel.modify("extend", "backward", "paragraphboundary");
					    var pos = sel.anchorOffset;//sel.toString().length;
					    if(sel.anchorNode != undefined) sel.collapseToEnd();

					    return pos;*/
					    //var editableDiv = $editor.get(0);
					    /*var caretPos = 0,
						sel, range;
						if (window.getSelection) {
						sel = window.getSelection();
						if (sel.rangeCount) {
						range = sel.getRangeAt(0);
						if (range.commonAncestorContainer.parentNode == editableDiv) {
						caretPos = range.endOffset;
						}
						}
						} else if (document.selection && document.selection.createRange) {
						range = document.selection.createRange();
						if (range.parentElement() == editableDiv) {
						var tempEl = document.createElement("span");
						editableDiv.insertBefore(tempEl, editableDiv.firstChild);
						var tempRange = range.duplicate();
						tempRange.moveToElementText(tempEl);
						tempRange.setEndPoint("EndToEnd", range);
						caretPos = tempRange.text.length;
						}
						}
						return caretPos;*/
						/*function node_walk(node, func) {
						  var result = func(node);
						  for(node = node.firstChild; result !== false && node; node = node.nextSibling)
						    result = node_walk(node, func);
						  return result;
						};

						// getCaretPosition: return [start, end] as offsets to elem.textContent that
						//   correspond to the selected portion of text
						//   (if start == end, caret is at given position and no text is selected)
						function getCaretPosition(elem) {
						  var sel = window.getSelection();
						  var cum_length = [0, 0];

						  if(sel.anchorNode == elem)
						    cum_length = [sel.anchorOffset, sel.extentOffset];
						  else {
						    var nodes_to_find = [sel.anchorNode, sel.extentNode];
						    if(!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
						      return undefined;
						    else {
						      var found = [0,0];
						      var i;
						      node_walk(elem, function(node) {
						        for(i = 0; i < 2; i++) {
						          if(node == nodes_to_find[i]) {
						            found[i] = true;
						            if(found[i == 0 ? 1 : 0])
						              return false; // all done
						          }
						        }

						        if(node.textContent && !node.firstChild) {
						          for(i = 0; i < 2; i++) {
						            if(!found[i])
						              cum_length[i] += node.textContent.length;
						          }
						        }
						      });
						      cum_length[0] += sel.anchorOffset;
						      cum_length[1] += sel.extentOffset;
						    }
						  }
						  if(cum_length[0] <= cum_length[1])
						    return cum_length;
						  return [cum_length[1], cum_length[0]];
						}
						return getCaretPosition(editableDiv)[0];*/
					},
					set_caret: function(elem, caretPos) {
					    //var elem = document.getElementById(elemId);
					    console.log(elem, caretPos);
					    /*if(elem != null) {
					        if(elem.createTextRange) {
					            var range = elem.createTextRange();
					            range.move('character', caretPos);
					            range.select();
					        }
					        else {
					            if(elem.selectionStart) {
					                elem.focus();
					                elem.setSelectionRange(caretPos, caretPos);
					            }
					            else
					                elem.focus();
					        }
					    }*/
						/*var node = elem;//document.querySelector("div");
						node.focus();
						var textNode = node.firstChild;
						var caret = caretPos; // insert caret after the 10th character say
						var range = document.createRange();
						range.setStart(textNode, caret);
						range.setEnd(textNode, caret);
						var sel = window.getSelection();
						sel.removeAllRanges();
						sel.addRange(range);*/
					    //this.set_cursor(elem, caretPos);
					},
					reset_cursor: function(is_mo, set_selection) {
						var branch = this;
						var $found = $(branch.path);
						console.log('reset cursor', $found, $found.get(0), branch.offset, branch.path);
						var set_offset = 1; //branch.offset-1;
						//set_offset = $found.get(0).textContent.length-1;
						/*console.log('set offset', set_offset);
						if(set_offset < 0) {
							set_offset = 0;
						}*/
						var $next_mi = null;
						if(is_mo) { //$found.is('mo')) {
							$next_mi = $found.parent().find('mi').last();
						}
						if($next_mi != null && $next_mi.length > 0) {

							branch.set_cursor($next_mi.get(0), set_offset, true);
						} else if($found.length > 0) {
							branch.set_cursor($found.get(0), branch.offset, set_selection);
						}
					},
					set_cursor: function(element, pos, set_as_selection) {
			            //var tag = document.getElementById("editable");
			            //var length = $(element).contents().length;
			            //pos = length;  
			            //console.log('set pos: '+pos);
			            // Creates range object
			            var setpos = document.createRange();
			              
			            // Creates object for selection
			            var set = window.getSelection();
			              
			            try {
				            // Set start position of range
				            if(typeof set_as_selection === 'undefined') {
					            setpos.setStart(element.childNodes[0], pos);
					            console.log('setstart', pos);
					              //
					            // Collapse range within its boundary points
					            // Returns boolean
					            setpos.collapse(true);
					              
					            // Remove all ranges set
					            set.removeAllRanges();
					              
					            // Add range with respect to range object.
					            set.addRange(setpos);
					        } else {
					        	console.log('setpos element', element);
					        	var range = setpos;
					        	var selection = set;
					        	//var $newSelection = $(element);
					        	range.setStartBefore(element);
								range.setEndAfter(element);
								selection.removeAllRanges();
								selection.addRange(range);
					        }
				        } catch(exception) {
				        	var $next = $(element).next();
				        	if($next.length > 0) {
				        		this.set_cursor($next.get(0), 0);
				        	}
				        }
			              
			            // Set cursor on focus
			            //element.focus();
			        },
			        operator_regex: /(\+|\-|\*)+/,
			        clear_empty: function(item) {
						for(var child of item.childNodes) {
							child.normalize();
							var $child = $(child);
							/*if($child.children().length == 0) {
								$child.html('<span>'+$child.text()+'</span>');
							}*/
							if($child.is('mo')) {
								if($child.text().length > 0) {
									var split = $child.text().split('');
									$child.text(split.splice(0, 1)[0]);
									for(var item of split) {
										$child.after('<mo>'+item+'</mo>');
									}
								}
								/*if($child.text().length > 0) {
									$child.text($child.text().substr(0, 1));
								}
								if($child.next().is('mo') && $child.next().text() != ')' && $child.next().text() != '(') {
									$child.next().remove();
								}*/
							}
							if(child.nodeType == Node.TEXT_NODE && child.nodeValue != null) {
								/*if(child.nodeValue.trim().length == null) {
									$(item).remove($(child));
								}*/
							} else {
								if($(child).text().trim() == '') {
									$(child).remove();
								}
								this.clear_empty(child);
							}

							child.normalize();
							var $child = $(child);
							/*if($child.children().length == 0) {
								$child.html('<span>'+$child.text()+'</span>');
							}*/
							if($child.is('mo')) {
								if($child.text().length > 0) {
									var split = $child.text().split('');
									$child.text(split.splice(0, 1)[0]);
									for(var item of split) {
										if(item.match(this.operator_regex) != null) {
											$child.after('<mo>'+item+'</mo>');
										}
									}
								}
								/*if($child.text().length > 0) {
									$child.text($child.text().substr(0, 1));
								}
								if($child.next().is('mo') && $child.next().text() != ')' && $child.next().text() != '(') {
									$child.next().remove();
								}*/
							}
							//$(child).parent().get(0).normalize();
							/*if($child.is('mi')) {
								if($child.next().is('mi')) {
									var values = $child.next().text();
									$child.next().remove();
									$child.append(values);
								}
							}*/
						}
			        },
			        ignore: ['Shift', 'Meta', 'Delete'],
			        init: function() {
			        	var branch = this;
			        	branch.$remove_fraction_button = $('.remove_fraction_button').first();
			        	branch.$remove_fraction_button.click(function() {

							var selection = window.getSelection();
							var $selection = $(selection.anchorNode);
							var $mfrac = $selection.closest('mfrac').first();

							var $contents = $mfrac.children();
							$contents.remove();
							$mfrac.replaceWith($contents);

							branch.clear_empty($editor.get(0));
							var $content = $editor.html();//.children().first();
							$editor.html($content);
							branch.clear_empty($editor.get(0));

							$editor.find('mi').each(function() {
								var $this = $(this);
								if($this.next().is('mi')) {
									$this.append($this.next().text());
									$this.next().remove();
								}
							});
			        	});
			        	branch.$make_fraction_button = $('.make_fraction_button').first();
			        	branch.$make_fraction_button.click(function() {


							var selection = window.getSelection();


							branch.offset = selection.anchorOffset;
							var path = $(selection.anchorNode).parent().getPath();
							branch.path = path;


							/*var range = selection.getRangeAt(0);

							console.log(selection, range);

							var fragment = range.cloneContents();
							const elements = [];
							const treeWalker = document.createTreeWalker(
							    fragment,
							    NodeFilter.SHOW_ELEMENT,
							    null,
							    false
							);

							let currentNode = treeWalker.nextNode();
							while (currentNode) {
							    elements.push(currentNode);
							    currentNode = treeWalker.nextNode();
							}

							console.log(elements);*/

							var $selection = $(selection.anchorNode).parent().parent();
							while($selection.parent().is('mfrac') || $selection.parent().is('msup')) {
								$selection = $selection.parent();
							}
							if($selection.is('math')) {
								$selection = $selection.children().last(); //.children().last();
							}
							$selection.wrap('<mfrac></mfrac>');
							$selection.parent().append('<mi>1</mi>');


							branch.clear_empty($editor.get(0));
							var $content = $editor.html();//.children().first();
							$editor.html($content);

							/*if(!set_cursor && did_print) {
								var $anchor = $(selection.anchorNode).parent();
								branch.set_cursor($anchor[0], 1);
							}*/
							branch.reset_cursor();
			        	});
			        	branch.$insert_node_before_button = $('.insert_node_before_button').first();
			        	branch.$insert_node_before_button.click(function() {

							var selection = window.getSelection();


							//branch.offset = selection.anchorOffset;
							//var path = $(selection.anchorNode).parent().getPath();
							//branch.path = path;

							var $selection = $(selection.anchorNode).parent().parent(); //.parent();
							console.log($selection.get(0));
							while($selection.parent().is('mfrac') || $selection.parent().is('msup')) {
								$selection = $selection.parent();
								console.log($selection.get(0));
							}
							var $paranthesis = false;
							$selection.parent().children().each(function() {
								var $self = $(this);
								if($self.is('mo') && $self.text().trim() == ')') {
									$paranthesis = $self;
								}
							});
							if($paranthesis != false) {
								$selection = $(branch.find_enclosing($paranthesis, true));
							}
							console.log($selection.get(0));
							if($selection.is('math')) {
								$selection = $selection.children().first(); //.children().last();
							}
							console.log($selection.get(0));

							var $set_node = $('<mi>0</mi>');
							$selection.before($set_node);

							var path = $set_node.getPath();
							branch.path = path;
							branch.offset = 0;

							branch.clear_empty($editor.get(0));
							var $content = $editor.html();//.children().first();
							$editor.html($content);

							/*if(!set_cursor && did_print) {
								var $anchor = $(selection.anchorNode).parent();
								branch.set_cursor($anchor[0], 1);
							}*/
							branch.reset_cursor(false, true);
			        	});
			        	branch.$insert_node_button = $('.insert_node_button').first();
			        	branch.$insert_node_button.click(function() {

							var selection = window.getSelection();


							//branch.offset = selection.anchorOffset;

							var $selection = $(selection.anchorNode).parent().parent(); //.parent();
							console.log($selection.get(0));
							while($selection.parent().is('mfrac') || $selection.parent().is('msup')) {
								$selection = $selection.parent();
								console.log($selection.get(0));
							}
							console.log($selection.get(0));
							if($selection.is('math')) {
								$selection = $selection.children().last(); //.children().last();
							}
							console.log($selection.get(0));
							var $set_node = $('<mi>0</mi>');
							$selection.after($set_node);


							var path = $set_node.getPath();
							branch.path = path;
							branch.offset = 0;

							branch.clear_empty($editor.get(0));
							var $content = $editor.html();//.children().first();
							$editor.html($content);

							/*if(!set_cursor && did_print) {
								var $anchor = $(selection.anchorNode).parent();
								branch.set_cursor($anchor[0], 1);
							}*/
							branch.reset_cursor(false, true);
			        	});
						var $editor = $('.main_math_ml_editor').first();
						branch.$editor = $editor;
						/*$editor.on('focusout', function(e) {
							e.preventDefault();
							branch.reset_cursor();
						});*/


						function splitOn(bound, cutElement) {
						    // cutElement must be a descendant of bound
						    for (var parent = cutElement.parentNode; bound != parent; parent = grandparent) {
						        var right = parent.cloneNode(false);
						        while (cutElement.nextSibling)
						            right.appendChild(cutElement.nextSibling);
						        var grandparent = parent.parentNode;
						        grandparent.insertBefore(right, parent.nextSibling);
						        grandparent.insertBefore(cutElement, right);
						    }
						}

						var has_reset = false;

						$editor.on('keyup', function(e) {
							var is_mo = false;
							//branch.offset = branch.get_offset($editor.get(0));
							var did_print = true;
							console.log('KEY: ', e.key);
							if(e.key.toLowerCase().indexOf('arrow') != -1 || e.key == 'Alt' || e.key.toLowerCase() == 'backspace' || branch.ignore.indexOf(e.key) != -1) {
								did_print = false;
								console.log('did print', did_print);
								return true;
							}
							var selection = window.getSelection();
							if(selection.anchorNode == null) {
								return true;
							}
							branch.offset = selection.anchorOffset;
							var path = $(selection.anchorNode).parent().getPath();
							branch.path = path;
							

							var selection_content = selection.anchorNode.textContent;

							var $anchor_node = $(selection.anchorNode);

							var $original_anchor = $anchor_node;


							var set_cursor = false;
							console.log($anchor_node.parent().get(0).tagName);

							var operator_regex = /(\+|\-|\*)+/; //|\/

							var value_regex = /[0-9a-z]+/;

							var divide_regex = /\/+/;

							var paranthesis_regex = /(\(|\))+/;
							if(did_print && (e.key == ')' || e.key == '(')) {
								var $set_parent = $anchor_node.parent();
								var $original_parent = $set_parent;
								var set_find = '(';
								var set_print = ')';
								if(e.key == '(') {
									set_find = ')';
									set_print = '(';
								}
								var found_opening = false;
								var traversed_all = false;
								/*while(!found_opening && !traversed_all) {
									var $found_enclosing = $set_parent.find('mo'); //contains(\\'+set_find+')
									$found_enclosing.each(function() {
										var $this = $(this);
										if($this.text().indexOf(set_find) != -1) {
											found_opening = true;
										}
									});
									console.log('found enclosing', $found_enclosing.length);
									
									if(found_opening) {

									} else {
										$set_parent = $set_parent.parent();
									}
									if(!$.contains($editor.get(0), $set_parent.get(0)) || $editor.get(0) == $set_parent.get(0) || $found_enclosing.length > 0) {
										//if(!found_opening) {
											traversed_all = true;
										//}
									}
								}
								if(found_opening && !traversed_all) {
									console.log('found opening: '+$set_parent.text().split(/\s+/).join(''), traversed_all);
									e.preventDefault();
									$set_parent.append('<mo>'+set_print+'</mo>');
									return false;
								} else {*/
									if(!$original_parent.is('mo')) {
										console.log('tagName', $original_parent.get(0).tagName);
										//e.preventDefault();
										//setTimeout(function() {
											var set_text = $original_parent.text().split(set_print).join('');
											$original_parent.text(set_text);
											var $set_parent = $original_parent.parent();
											while($set_parent.length > 0 && ($set_parent.is('mfrac') || $set_parent.is('msup'))) {
												$original_parent = $original_parent.parent();
												$set_parent = $set_parent.parent();
											}
											var $insert_node = $('<mo>'+set_print+'</mo>');
											if(set_print == ')') {
												$original_parent.after($insert_node);
											} else {
												$original_parent.before($insert_node);
											}
										//}, 1);
										//return false;
									}
									//e.preventDefault();
								//}

							} else if(did_print && e.key == '^') {
								var text = $anchor_node.parent().text();
								var set_text = text.split('^').join('');
								var $set_element = $anchor_node.parent();
								$set_element.text(set_text);

								var set_value = $set_element.html();
								if(set_value.indexOf('<') === -1) {
									set_value = '<mi>'+set_value+'</mi>';
								}

								$set_element.replaceWith('<msup><mrow>'+set_value+'</mrow><mi>1</mi></msup>');
								//var $content = $editor.html();//.children().first();
								//$editor.html($content);
							} else if(did_print && e.key.toLowerCase().match(divide_regex) != null) {
								var item = selection.anchorNode.parentNode;

								var $item = $(item);

								console.log('divide: ', $item.text());

								if($item.is('mo') && ($item.text().trim() == ')/' || ($item.prev().text() == ')' && $item.text() == '/'))) {
									var $enclosing = branch.find_enclosing($item);

									var $parent = $enclosing;
									$parent.wrap('<mfrac></mfrac>');
									$parent.after('<mi>1</mi>');
									$item.text(')');
								} else if(!$item.is('mi')) {
									var $parent = $item.parent();
									$parent.wrap('<mfrac></mfrac>');
									$parent.after('<mi>1</mi>');

								} else {
									/*var get_split_node = function() {
										for(var child of item.childNodes) {
											if(child.nodeType == Node.TEXT_NODE && child.nodeValue != null) {
												if(child.nodeValue.trim().match(divide_regex) != null) {
													return child;
												}
											}
										}
									};*/

									/*var split_node = get_split_node();
									var original_node = selection.anchorNode;

									console.log('split_node', split_node, original_node);

									if(original_node == split_node) {*/
									var split_value =  selection_content.split(e.key);
									var text_value = split_value[0];//.join('');

									var denominator = split_value[1];
									if(denominator.trim().length == 0) {
										denominator = '1';
									}



									//$anchor_node = $anchor_node.parent();
									$original_anchor = $anchor_node;
									//setTimeout(function() {
										//$original_anchor.parent().html(text_value);
										//$original_anchor.get(0).normalize();
									//}, 1);
									/*var $insert_item = null; 
									if($original_anchor.parent().next().is('mi')) {
										$insert_item = $original_anchor.parent().next();
										$insert_item.prepend(e.key);
										$insert_item.get(0).normalize();
									} else {
										$insert_item = $(document.createElement('mi'));
										$insert_item.html(e.key);
										$anchor_node.parent().after($insert_item);
									}*/


									//selection.anchorNode.parentElement.normalize();
									//$(original_node).html(text_value);
									//$(selection.anchorNode)
									//$original_anchor.text(text_value);
									/*console.log('set text', text_value);
									branch.set_cursor($insert_item[0], 1);
									set_cursor = true;*/


									//$original_anchor.parent().html(text_value);

									if(text_value.indexOf('<') == -1) {
										text_value = '<mi>'+text_value+'</mi>';
									}
									if(denominator.indexOf('<') == -1) {
										denominator = '<mi>'+denominator+'</mi>';
									}

									$original_anchor.parent().wrap('<mfrac></mfract>');
									$original_anchor.parent().parent().html(text_value+denominator);

								}
								//var $content = $editor.html();//.children().first();
								//$content.detach();
								//$editor.html($content);
								/*} else {
									splitOn(original_node, split_node);
								}*/
								
							} else if(did_print && $anchor_node.parent().is('mo') && e.key.toLowerCase().match(value_regex) != null) {
								//console.log('in1');
								var item = selection.anchorNode.parentNode;
								var get_split_node = function() {
									for(var child of item.childNodes) {
										if(child.nodeType == Node.TEXT_NODE && child.nodeValue != null) {
											if(child.nodeValue.trim().match(value_regex) != null) {
												return child;
											}
										}
									}
								};

								/*var split_node = get_split_node();
								var original_node = selection.anchorNode;

								console.log('split_node', split_node, original_node);

								if(original_node == split_node) {*/
									var $parent_anchor = $original_anchor.parent();
									var split_value = selection_content.split(e.key);//.join('');
									var text_value = split_value[0];

									//$anchor_node = $anchor_node.parent();
									$original_anchor = $anchor_node;
									//setTimeout(function() {
										//$original_anchor.parent().html(text_value);
										//$original_anchor.get(0).normalize();
									//}, 1);
									var $insert_item = null; 
									if($original_anchor.parent().next().is('mi')) {
										$insert_item = $original_anchor.parent().next();
										$insert_item.prepend(e.key);
										$insert_item.get(0).normalize();
									} else {
										$insert_item = $(document.createElement('mi'));
										$insert_item.html(e.key);
										$anchor_node.parent().after($insert_item);
									}

									//selection.anchorNode.parentElement.normalize();
									//$(original_node).html(text_value);
									//$(selection.anchorNode)
									//$original_anchor.text(text_value);
									$parent_anchor.html(text_value);

									var rest = split_value[1];
									var $rest = $('<mo>'+rest+'</mo>');

									$parent_anchor.after($rest);
									console.log('set text', text_value);
									branch.set_cursor($insert_item[0], 1);
									set_cursor = true;


								/*} else {
									splitOn(original_node, split_node);
								}*/
								
							} else if(did_print /*&& $anchor_node.parent().is('mi')*/ && e.key.toLowerCase().match(operator_regex) != null) {
								is_mo = true;
								var item = selection.anchorNode.parentNode;
								var get_split_node = function() {
									for(var child of item.childNodes) {
										if(child.nodeType == Node.TEXT_NODE && child.nodeValue != null) {
											if(child.nodeValue.trim().match(operator_regex) != null) {
												return child;
											}
										}
									}
								};

								/*var split_node = get_split_node();
								var original_node = selection.anchorNode;

								console.log('split_node', split_node, original_node);

								if(original_node == split_node) {*/
									var split_value = selection_content.split(e.key);
									console.log('split value: ',selection_content, split_value);
									var text_value = split_value[0];
									//.join('');
										console.log('set text value mo', text_value);
									var append_value = split_value[1].trim();
									if(append_value.length == 0) {
										append_value = '0';
									}

									//$anchor_node = $anchor_node.parent();
									$original_anchor = $anchor_node;
									var $anchor_parent = $anchor_node.parent();
									//setTimeout(function() {
										console.log('set text value mo', text_value);
										//$original_anchor.parent().html(text_value);
									//}, 1);
									var $insert_item = null; 
									if(false && $original_anchor.parent().next().is('mo') && $original_anchor.parent().next().html().indexOf(')') == -1) {
										/*$insert_item = $original_anchor.parent().next();
										$insert_item.prepend(e.key);
										$insert_item.get(0).normalize();*/
									} else {
										/*var set_mi_after = false;
										if($original_anchor.parent().next().html().indexOf(')') != -1) {
											set_mi_after = true;
										}*/

										if($original_anchor.parent().parent().is('mfrac') || $original_anchor.parent().parent().is('msup')) {
											$original_anchor.parent().wrap('<mrow></mrow>');
										}

										var set_mi_after = true;
										$insert_item = $(document.createElement('mo'));
										$insert_item.html(e.key);
										$anchor_node.parent().after($insert_item);

										var $next_insert_item = $(document.createElement('mi'));
										$next_insert_item.html(append_value);
										$insert_item.after($next_insert_item);
										//$insert_item = $('<mo>'+e.key+'</mo><mi>0</mi>');
										//$anchor_node.parent().after($insert_item);

									}

									//selection.anchorNode.parentElement.normalize();
									//$(original_node).html(text_value);
									//$(selection.anchorNode)
									//$original_anchor.text(text_value);
									console.log('set text', text_value);
									branch.set_cursor($insert_item[0], 1);
									set_cursor = true;

									$anchor_parent.html(text_value);
									//alert($anchor_parent.text());
								/*} else {
									splitOn(original_node, split_node);
								}*/
								//var selection_after = window.getSelection();
								//$(selection_after.anchorNode).html($(selection_after.anchorNode).html());

								//branch.offset = selection.getRangeAt(0).startOffset;
								//console.log(selection.getRangeAt(0));
								//var $content = $editor.html();//.children().first();
								//$content.detach();
								//$editor.html($content);
								has_reset = true;
							}/* else if(did_print && $anchor_node.parent().is('mi')) {
								console.log(selection_content, selection);
								for(var operator of branch.operators) {
									if(selection_content.indexOf(operator) != -1) {
										var $insert_item = $(document.createElement('mo'));
										$insert_item.html(operator);
										var $anchor = $(selection.anchorNode).parent();

										var $original_anchor = $anchor;

										var $next = $anchor.next();

										//if($next.is('mo')) {
										//	$next.prepend(operator);
										//} else {
											$anchor.after($insert_item);
											selection_content = selection_content.split(operator).join('');
											$(selection.anchorNode).text(selection_content);

											branch.set_cursor($insert_item[0], 1);
											set_cursor = true;
										//}
									}
								}
							}*/
							$editor.get(0).normalize();
							branch.clear_empty($editor.get(0));
							if(has_reset) {

							}

							var $content = $editor.html();//.children().first();
							$editor.html($content);

							/*if(!set_cursor && did_print) {
								var $anchor = $(selection.anchorNode).parent();
								branch.set_cursor($anchor[0], 1);
							}*/
							branch.reset_cursor(is_mo);
							//branch.set_caret($editor.children().first().get(0), branch.offset);
							//console.log(selection_content);
						});
					},
					operators: ['=', '+', '-', '/', '(', ')'],
					find_enclosing: function($item, return_start) {
						var $parent = $item.parent();
						var $start = null;
						var enclosing = [];
						var completed = false;
						var reversed = $parent.children().toArray();
						console.log(reversed);
						reversed.reverse();
						var count = 0;
						$(reversed).each(function() {
							var $this = $(this);
							if(!completed) {
								//if($this.is('mo') && $this.text().trim() == ')' && $start == null) {
								if($this.get(0) == $item.get(0)) {
									$start = $this;
									//enclosing.push(this);
								}

								if($start != null) {
									enclosing.push(this);
								}
								/*if($item.get(0) == this) {
									completed = true;
									//start = null;
								}*/
								console.log('count: ', count, $this.text());
								if($start != null) {
									if($this.text().trim() == ')' || $this.text().trim() == ')/') {
										count++;
									}
									if($this.text().trim() == '(') {
										count--;
									}
								}

								if($this.is('mo') && $this.text().trim() == '(' && count == 0) {
									completed = true;
								}
								
							}
						});
						console.log(enclosing);
						enclosing.reverse();
						if(typeof return_start !== 'undefined') {
							return enclosing[0];
						}
						$(enclosing).wrapAll('<mrow></mrow>');
						return $item.parent();
					}
				};
				editor.init();
			},
			load: function(input) {
				var self = this;
				if(typeof input.send_data !== 'undefined') {
					
				}

				if(typeof input.callback !== 'undefined') {
					input.callback();
				}
			}
		};

		return item_reference;
	}
};